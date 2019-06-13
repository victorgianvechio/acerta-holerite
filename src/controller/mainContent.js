const pdf = require('../util/pdfReader.js')
const cfg = require('../util/configEnvironment.js')
const ipc = require('electron').ipcRenderer
const timeout = require('../util/timeout.js')

const generateFile = async ($, remote) => {
    let options = ''
    let outputPath = $('#outputPath').val()
    let filePath = $('#filePath').val()

    ipc.send('show-progressbar', 'Dividindo e renomeando arquivos')

    await pdf
        .proccessPDF(filePath, outputPath)
        .then(v => {
            options = {
                type: 'info',
                title: 'Acerta Holerite',
                message: 'Geração de arquivo realizada com sucesso.',
                detail: outputPath
            }
        })
        .catch(err => {
            options = {
                type: 'error',
                title: 'Acerta Holerite',
                message: err,
                detail:
                    'Log gerado.\nEntrar em contato com o Desenvolvimento de Sistemas.'
            }
        })

    await ipc.send('set-progressbar-completed')
    remote.dialog.showMessageBox(null, options)
}

async function configure(remote) {
    let winrarExist = await cfg.checkWinrar()
    let envExist = await cfg.checkEnv()
    let folderExist = await cfg.checkFolder()

    let options = {
        type: '',
        title: 'Acerta Holerite',
        message: '',
        detail: ''
    }

    if (!winrarExist) {
        options.type = 'warning'
        options.message = 'Necessário instalar Winrar.'
        remote.dialog.showMessageBox(null, options)
        return
    }

    options.type = 'info'
    options.message = 'Configuração realizada com sucesso!'

    if (!folderExist) {
        options.detail += '- Dependências instaladas.\n'
        await ipc.send('show-progressbar', 'Instalando dependências')
        await cfg.extract()
        await timeout(3000)
        await ipc.send('set-progressbar-completed')
    }

    if (!envExist) {
        options.detail +=
            '- Variável de ambiente criada.\n\nNecessário reiniciar a aplicação.'
        await ipc.send('show-progressbar', 'Configurando variável de ambiente')
        await cfg.setEnv()
        await timeout(3000)
        await ipc.send('set-progressbar-completed')
    }

    if (envExist && folderExist)
        options.message = 'Parâmetros e configurações já realizadas.'

    await timeout(500)
    await remote.dialog.showMessageBox(null, options)
    if (!envExist) await remote.getCurrentWindow().close()
}

function getWindow() {
    return remote.BrowserWindow.getFocusedWindow()
}

function selectFile(remote) {
    let path = remote.dialog.showOpenDialog({
        filters: [{ name: 'PDF', extensions: ['pdf'] }],
        properties: ['openFile']
    })
    $('#filePath').val(path)
}

function selectOutput(remote) {
    let path = remote.dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    $('#outputPath').val(path)
}

function validade($, remote) {
    let outputPath = $('#outputPath').val()
    let filePath = $('#filePath').val()
    let isValid = true

    let options = {
        type: 'error',
        title: 'Acerta Holerite',
        message: 'Preencher campos obrigatórios:',
        detail: ''
    }

    if (filePath === '') {
        options.detail += '- Arquivo \n'
        isValid = false
    }

    if (outputPath === '') {
        options.detail += '- Diretório'
        isValid = false
    }

    if (isValid) generateFile($, remote)
    else remote.dialog.showMessageBox(null, options)
}

module.exports = ($, remote) => {
    $('#mainContent').load('../../app/view/components/mainContent.html')

    $(document).ready(() => {
        $('#btnSair').click(() => {
            getWindow().close()
        })

        $('#btnGerar').click(() => {
            validade($, remote)
        })

        $('#btnFile').click(() => {
            selectFile(remote)
        })

        $('#btnOutput').click(() => {
            selectOutput(remote)
        })

        $('#filePath').click(() => {
            selectFile(remote)
        })

        $('#outputPath').click(() => {
            selectOutput(remote)
        })

        $('#btnConfig').click(() => {
            configure(remote)
        })
    })
}
