/*
Add logger which will log incoming requests to service (at least url, query parameters, body) and response status code.
Add logger which will log all unhandled errors and return a standard message with HTTP code 500 (Internal Server Error).
Add listener and logging to uncaughtException.
Add listener and logging to unhandledRejection.
Writing to process.stdout or to a file both can be used for logging. Any third-party logging library can also be used for this purpose.
Create multiple logging levels and store logging level in environment variable.
*/

// import pino, { stdSerializers, transport } from 'pino'
import path from 'path'
// import PinoPretty from 'pino-pretty';
import fs from 'fs'
import { koaContext } from './types';
import moment from 'moment';

const logPath = path.join(__dirname, '/logs');
// const errorLogFileName = path.join(logPath, 'errors.log')
// const infoLogFileName = path.join(logPath, 'trace.log')
const infoLogFileName = ('./trace.log')

// const errorLogFile = fs.createWriteStream(infoLogFileName,{flags: "a"})


function isEmpty(obj: Object): boolean {
    for (let key in obj) {
        // если тело цикла начнет выполняться - значит в объекте есть свойства
        return false;
    }
    return true;
}


export const myReqLogger = function (ctx: koaContext | string): void {
    const ts: string = moment().format('lll');
    let msg: string = '';
    if (typeof ctx === 'string') {
        msg = `${ts} -< ${ctx}`
        console.log(ctx);
    }
    else {
        msg = `${ts} -< ${ctx.host} ${ctx.method} ${ctx.path}`
        if (!isEmpty(ctx.request.query)) { msg += ' (' + JSON.stringify(ctx.request.query) + ')' }
        if (!isEmpty(ctx.request.body)) { msg += JSON.stringify(ctx.request.body) }
    }
    console.log(msg);
}

export const myResLogger = function (ctx: koaContext | string, level: string = 'info'): void {
    const ts: string = moment().format('lll');
    let msg: string = '';
    if (typeof ctx === 'string') {
        msg = `${ts} -< ${ctx}`
    }
    else {
        msg = `${ts} -> ${ctx.status} ${ctx.message}`
    }
    console.log(msg);
}
// export const writeRequestLog = function (msg: string | koaContext, level: string = 'info') {



//     if (typeof msg === 'string') {

//         loggerInfo[level](msg)
//     }
//     else {
//         let setOfMsg = `<- ${msg.req.method} ${msg.originalUrl}`
//         if (msg.request.body) {
//             setOfMsg += JSON.stringify(msg.request.body)
//         }
//         loggerInfo[level](setOfMsg)
//     }
// }

// export const writeReasponseLog = function (msg: string | koaContext, level: string = 'info') {
//     if (typeof msg === 'string') {
//         loggerInfo[level](msg)
//     }
//     else {

//         let setOfMsg = `<- ${msg.status} ${msg.message}`
//         loggerInfo[level](setOfMsg)
//     }
// }

