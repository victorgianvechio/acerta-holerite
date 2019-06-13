const fs = require('fs')
const util = require('util')
const path = require('path')
const log_stdout = process.stdout
let logPath = ''

if (process.env.NODE_ENV === 'production')
    logPath = path.join(__dirname, '../../../../')
else if (process.env.NODE_ENV === 'development')
    logPath = path.join(__dirname, '../../log/')

const log_file = fs.createWriteStream(path.join(logPath, 'debug.log'), {
    flags: 'w'
})

const pdf_file = fs.createWriteStream(path.join(logPath, 'pdf.log'), {
    flags: 'w'
})

// Gera arquivo de Log com nome extraído
const debug = function(d) {
    log_file.write(util.format(d) + '\n')
    log_stdout.write(util.format(d) + '\n')
}

// Gera arquivo com o PDF extraído
const pdf = function(d) {
    pdf_file.write(util.format(d) + '\n')
    log_stdout.write(util.format(d) + '\n')
}

module.exports = { debug, pdf }
