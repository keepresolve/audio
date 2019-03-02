let debug = require('debug')('koa:router')
const router = require('koa-router')()
let api = require('./api')
let token = require('../util/token')
let errorInfo = require('../config/errorcode')
// let inputVerify = require('./inputVerify')

//https://cnodejs.org/topic/5b13c12157137f22415c4892 koa-router详细解释
//router.allowedMethods()
// 错误统一处理  throw 并返回
const errHandler = async (ctx, next) => {
    try {
        // ctx.response.set('Access-Control-Allow-Origin', '*')
        await next()
        //response.status default 404, check https://koajs.com/#response
        //response.body 一旦设置就改为200
    } catch (err) {
        if (err.hasOwnProperty('custom')) {
            err.info = err.info ? err.info : errorInfo(err.status)
            delete err.custom
            logger.debug('emit custom error')
            ctx.response.body = err
        } else {
            ctx.response.status = err.statusCode || err.status || 500
            ctx.response.body = { status: 99999, info: err.message }
            logger.debug('emit system error')
        }
        ctx.app.emit('error', err, ctx)
    }
}

const tokenVerify = async (ctx, next) => {
    let url = ctx.request.path
    ctx.input_params =
        ctx.method.toLowerCase() == 'get' ? ctx.request.query : ctx.request.body
    switch (url) {
        default:
            let result = await token.autheration(ctx)
            if (result.status == 0) return await next()
            // ctx.response.body = result
            break
    }
}
// middleware
router.use(errHandler) //错误处理
router.use(tokenVerify) //验证token 企业
router.use(api.routes()) //企业接口

module.exports = router
