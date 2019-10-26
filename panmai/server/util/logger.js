const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, colorize } = format
let path = require('path')
// 自定义输出格式
const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`
})

const logger = createLogger({
    level: 'debug',
    format: combine(colorize(), timestamp(), myFormat),
    transports: [
        new transports.File({
            filename: path.join(app.root, 'log', 'error.log'),
            level: 'error'
        }),
        new transports.File({
            filename: path.join(app.root, 'log', 'combined.log')
        })
    ],
    exitOnError: false
})
// 不是生产环境 信息输出到控制台
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: combine(timestamp(), myFormat)
        })
    )
    let koaLogger = require('koa-logger')
    app.use(koaLogger((str, args) => logger.http(str)))
}

global.logger = logger
