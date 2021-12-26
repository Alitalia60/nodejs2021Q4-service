/*
Add logger which will log incoming requests to service (at least url, query parameters, body) and response status code.
Add logger which will log all unhandled errors and return a standard message with HTTP code 500 (Internal Server Error).
Add listener and logging to uncaughtException.
Add listener and logging to unhandledRejection.
Writing to process.stdout or to a file both can be used for logging. Any third-party logging library can also be used for this purpose.
Create multiple logging levels and store logging level in environment variable.
*/

import dotenv from "dotenv";
import fs from 'fs'
import { koaContext } from './types';
import moment from 'moment';

const logLlevels = ['error', 'warn', "info", "debug", "all"]

const envParsed = dotenv.config().parsed;
let LOG_STDOUT: boolean = true;
let LOG_FILE: boolean = true;
let LOG_LEVEL: string = 'info';

if (envParsed) {
    if (envParsed["LOG_STDOUT"]) {
        LOG_STDOUT = Boolean(envParsed["LOG_STDOUT"]);
    }
    if (envParsed["LOG_LEVEL"]) {
        LOG_LEVEL = envParsed["LOG_LEVEL"];
    }
    if (envParsed["LOG_FILE"]) {
        LOG_FILE = Boolean(envParsed["LOG_FILE"]);
    }
}

const logFileName = ('./dist/log/trace.log')

/**
 * write log message to file or/and to stdout
 * 
 * @param ctx  - koa context
 * @param level - log level one of ['error', 'warn', "info", "debug", "all"]
 */
export const logger = function (ctx: koaContext | string, level: string = 'info'): void {
    if (logLlevels.indexOf(level) <= logLlevels.indexOf(LOG_LEVEL)) {

        const ts: string = moment().format('lll');
        let msg: string = '';
        if (typeof ctx === 'string') {
            msg += `${ts} [${level}]  <- ${ctx}`
        }
        else {
            msg += `${ts} [${level}]  <- ${ctx.host} ${ctx.method} ${ctx.path}`
        }

        if (LOG_STDOUT) {
            console.log(msg);
        }

        if (LOG_FILE) {
            fs.appendFile(logFileName, msg + '\n', function (error) {
                if (error) throw error;
            });
        }

        msg = ``;

        if (typeof ctx === 'string') {
            msg += `  -> ${ctx}`
        }
        else {
            msg += `  -> ${ctx.response.status} ${ctx.response.message}`
        }


        if (LOG_STDOUT) {
            console.log(msg);
        }
        if (LOG_FILE) {
            fs.appendFile(logFileName, msg + '\n', function (error) {
                if (error) {
                    logger(error.message, 'error')
                    throw error;
                }
            });
        }
    }
}

