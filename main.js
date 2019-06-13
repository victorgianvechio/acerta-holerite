const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const ProgressBar = require('electron-progressbar')

let mainWindow = ''
let progressBar = ''

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 460, // 460
        height: 420, // 420
        show: false,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        transparent: false,
        resizable: false,
        icon: path.join(__dirname, '/app/assets/img/icon/pdf.ico')
    })

    //mainWindow.loadFile('index.html')
    //mainWindow.webContents.openDevTools()

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, '/app/view/index.html'),
            protocol: 'file:',
            slashes: true
        })
    )

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on('closed', function() {
        mainWindow = null
    })
}

function changeProgressbarText(texto) {
    if (progressBar) return

    progressBar.text = texto
}

function showProgressbar(texto) {
    if (progressBar) return

    progressBar = new ProgressBar({
        title: 'Acerta Holerite',
        text: texto,
        detail: 'Aguarde...',
        options: {
            closeOnComplete: false
        },
        browserWindow: {
            parent: null,
            modal: true,
            resizable: false,
            closable: false,
            minimizable: false,
            maximizable: false,
            width: 400,
            height: 170,
            webPreferences: {
                nodeIntegration: true
            }
        }
    })

    progressBar.on('completed', function() {
        //progressBar.detail = 'Task completed. Exiting...'
        progressBar = null
    })
}

function setProgressbarCompleted() {
    if (progressBar) {
        progressBar.setCompleted()
    }
}

ipcMain.on('show-progressbar', (event, texto) => {
    showProgressbar(texto)
})

ipcMain.on('change-progressbartext', (event, texto) => {
    changeProgressbarText(texto)
})

ipcMain.on('set-progressbar-completed', setProgressbarCompleted)

app.on('ready', () => {
    createWindow()
    globalShortcut.register('CommandOrControl+P', () => {
        mainWindow.webContents.openDevTools()
    })
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})
