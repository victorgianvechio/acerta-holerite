const fs = require('fs')
const util = require('util')
const path = require('path')
const projectPath = require('./projectPath.js')
const logStdout = process.stdout

let logPath = ''
let logFile = ''
let pdfFile = ''

if (process.env.NODE_ENV === 'production')
    logPath = path.join(projectPath.appPath, '/logs')
else if (process.env.NODE_ENV === 'development')
    logPath = path.join(projectPath.devPath, '/logs')

const create = () => {
    logFile = fs.createWriteStream(
        path.join(logPath, `debug-${getDate()}.log`),
        {
            flags: 'w'
        }
    )

    pdfFile = fs.createWriteStream(path.join(logPath, `pdf-${getDate()}.log`), {
        flags: 'w'
    })
}

// Gera arquivo de Log com nome extraído
const debug = text => {
    logFile.write(`${util.format(text)}\n`)
    logStdout.write(`${util.format(text)}\n`)
}

// Gera arquivo com o PDF extraído
const pdf = text => {
    pdfFile.write(`${util.format(text)}\n`)
    logStdout.write(`${util.format(text)}\n`)
}

function getDate() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1 // 0-11 (zero=janeiro)
    let year = date.getFullYear()

    return `${day}-${
        month.toString().length == 1 ? '0' + month : month
    }-${year}`
}

module.exports = { debug, pdf, create }
