var path = require('path')
// let Promise = require('bluebird')
const router = require('../routes')
require('dotenv-flow').config({
    default_node_env: 'development',
    cwd: path.resolve(__dirname, '../node_env')
})
app.root = path.resolve(__dirname, process.env.root || '../../dist')
app.dbPath = path.resolve(app.root, process.env.dbPath)

// const betterBody = require('koa-better-body') //https://www.npmjs.com/package/koa-better-body  这里有很好的解释
//https://stackoverflow.com/questions/33751203/how-to-parse-multipart-form-data-body-with-koa
//一样问题，我的选择是 koa-body
const koaBody = require('koa-body')
let { createModel } = require('../database')
var debug = require('debug')('koa:init')

init()

async function init() {
    debug('set up logger')
    //logger要放在启动我们自己包的最前面，因为我们自己包都会记录logger
    require('./logger')
    // 挂载全局的db/redis
    app.db = await createModel()
    app.use(require('koa-static')(app.root))
    app.use(koaBody({ multipart: true }))
    require('../controller/socket')
    app.use(router.routes()).use(router.allowedMethods())
    // error-handling
    app.on('error', (err, ctx) => {
        logger.error(`${err.message ? err.message : err.info} : ${err.stack}`)
    })
    debug('一个企业一对queue，在收到实际质检请求时候创建')
    debug('connect redis')
    //https://cnodejs.org/topic/56835f18b9de25e81e01c211
    //但是到现在也没合并，ioredis其实不需要promisefy，但这样我们代码要改的地方太多了
    // let redisClient = new Redis({
    //     host: process.env.redisHost || 'localhost',
    //     port: process.env.redisPort || 6379
    // })
    // app.redisClient = Promise.promisifyAll(redisClient)
}
