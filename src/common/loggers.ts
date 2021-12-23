/*
Add logger which will log incoming requests to service (at least url, query parameters, body) and response status code.
Add logger which will log all unhandled errors and return a standard message with HTTP code 500 (Internal Server Error).
Add listener and logging to uncaughtException.
Add listener and logging to unhandledRejection.
Writing to process.stdout or to a file both can be used for logging. Any third-party logging library can also be used for this purpose.
Create multiple logging levels and store logging level in environment variable.
*/

import pino, { transport } from 'pino'
import path from 'path'
import fs from 'fs'

const logPath = path.join(__dirname, '/logs');
// const errorLogFileName = path.join(logPath, 'errors.log')
// const infoLogFileName = path.join(logPath, 'trace.log')
const infoLogFileName = ('./trace.log')


// const errorLogFile = fs.createWriteStream(infoLogFileName,{flags: "a"})

console.log(Object.keys(pino.destination));

const loggerInfo = pino({
    "name":"infoLogger",
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "pid, hostname",
        }
    }
}, pino.destination(infoLogFileName))


// loggerInfo.destination(errorLogFile)

// const transportInfo = pino.transport({
//     targets: [{
//       level: 'info',
//       target: 'pino-pretty' // must be installed separately
//     }, {
//       level: 'trace',
//       target: 'pino/file',
//       options: { destination: '/path/to/store/logs' }
//     }]
//   })

function writeLog(msg:string, level:string ='info' ) {
    loggerInfo[level](msg)
}

export = writeLog