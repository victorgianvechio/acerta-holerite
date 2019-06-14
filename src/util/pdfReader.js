/*
    Processa o arquivo dividindo por página e extraíndo o
    Cod. Funcionario para renomear cada arquivos 
*/

const extract = require('pdf-text-extract')
const hummus = require('hummus')
const path = require('path')
const fs = require('fs')
const log = require('./logger.js')
const ipc = require('electron').ipcRenderer

let fieldName = 'Sal.Fam.'
let fileName = ''
let posName = 0
let qtdeChar = 8

// Deleta os arquivos da pasta
async function deleteFiles() {
    await fs.readdirSync(outputFolder).filter(file => {
        fs.unlinkSync(path.join(outputFolder, file))
    })
}

// fieldName = Texto próximo a informação que quer extrair
// posName = posição do fieldName dentro do PDF
// qtdeChar = quantidade de caracteres após o fieldName para achar a
// informação que vai no nome do arquivo

// Configurar apenas o fieldName e a qtdeChar
// Verificar a pasta /log após o processamento

const proccessPDF = (filePath, outputPath) => {
    let sourcePDF = filePath
    let outputFolder = outputPath
    let mensagem = ''
    let pdfWriter = ''

    return new Promise((resolve, reject) => {
        extract(sourcePDF, (err, pages) => {
            if (err) reject(err)

            if (pages && pages.length >= 2) {
                ipc.send(
                    'show-progressbar',
                    'Dividindo e renomeando arquivos',
                    false,
                    pages.length
                )

                log.pdf(pages[1])

                for (let i = 0; i < pages.length; i++) {
                    ipc.send('progressbar-next')

                    posName = pages[i].indexOf(fieldName) + fieldName.length
                    fileName = pages[i]
                        .trim()
                        .substring(posName, posName + qtdeChar)

                    log.debug(`page${i + 1} - ${fileName.trim()}.pdf`)

                    if (fileName.trim().length === 6) {
                        pdfWriter = hummus.createWriter(
                            path.join(outputFolder, `${fileName.trim()}.pdf`)
                        )
                        pdfWriter.appendPDFPagesFromPDF(sourcePDF, {
                            type: hummus.eRangeTypeSpecific,
                            specificRanges: [[i, i]]
                        })
                        pdfWriter.end()
                    } else {
                        mensagem = 'Inconsistência encontrada!'
                        reject(mensagem)
                    }
                }
                resolve(mensagem)
            } else {
                mensagem = 'Arquivo inválido.'
                log.debug(
                    'Arqivo corrompido, inválido ou possuí apenas uma página.'
                )
                reject(mensagem)
            }
        })
    })
}

module.exports = { proccessPDF: proccessPDF }
