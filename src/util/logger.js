const fs = require('fs')
const util = require('util')
const path = require('path')
const projectPath = require('./projectPath.js')
const logStdout = process.stdout

let logPath = ''

if (process.env.NODE_ENV === 'production')
    logPath = path.join(projectPath.appPath, '/logs')
else if (process.env.NODE_ENV === 'development')
    logPath = path.join(projectPath.devPath, '/logs')

const logFile = fs.createWriteStream(path.join(logPath, 'debug.log'), {
    flags: 'w'
})

const pdfFile = fs.createWriteStream(path.join(logPath, 'pdf.log'), {
    flags: 'w'
})

// Gera arquivo de Log com nome extraído
const debug = function(d) {
    logFile.write(util.format(d) + '\n')
    logStdout.write(util.format(d) + '\n')
}

// Gera arquivo com o PDF extraído
const pdf = function(d) {
    pdfFile.write(util.format(d) + '\n')
    logStdout.write(util.format(d) + '\n')
}

module.exports = { debug, pdf }
