var path = require('path')
const session = require('koa-session')
const router = require('../routes')
require('dotenv-flow').config({
    default_node_env: 'development',
    cwd: path.resolve(__dirname, '../node_env')
})
app.root = path.resolve(__dirname, process.env.root || '../../dist/')
app.dbPath = path.resolve(app.root, process.env.dbPath)
app.keys = ['this is my secret and fuck you all'] //我理解为一个加密的钥匙，类似一个token
// const betterBody = require('koa-better-body') //https://www.npmjs.com/package/koa-better-body  这里有很好的解释
//https://stackoverflow.com/questions/33751203/how-to-parse-multipart-form-data-body-with-koa
//一样问题，我的选择是 koa-body
const koaBody = require('koa-body')
let { createModel } = require('../database')
var debug = require('debug')('koa:init')

init()

async function init() {
    //logger要放在启动我们自己包的最前面，因为我们自己包都会记录logger
    require('./logger')

    // 挂载全局的db/redis
    app.db = await createModel()
    app.use(require('koa-static')(app.root))
    app.use(
        session(
            {
                key: 'koa:sess' /** cookie的名称，可以不管 */,
                maxAge: 7200000 /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */,
                overwrite: true /** (boolean) can overwrite or not (default true) */,
                httpOnly: true /** (boolean) httpOnly or not (default true) */,
                signed: true /** (boolean) signed or not (default true) */
            },
            app
        )
    )
    app.use(koaBody({ multipart: true }))
    require('../controller/socket')
    app.use(router.routes()).use(router.allowedMethods())
    // error-handling
    app.on('error', (err, ctx) => {
        logger.error(`${err.message ? err.message : err.info} : ${err.stack}`)
    })
}
