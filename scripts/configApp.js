// Cria a pasta Logs e o arquivo de conexão .env

const configLog = require('../src/util/configLog.js')

;(async () => {
    if (process.env.NODE_ENV === 'production') {
        await configLog.checkFolder()
    }
})()
