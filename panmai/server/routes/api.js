const router = require('koa-router')()
var api = require('../controller/api')
// router.prefix(process.env.baseUri) //第一版
//注册企业
router.all('/login', async ctx => {
    var result = await api.login(ctx)
    logger.debug(`login:${JSON.stringify(result)}`)
    ctx.response.body = result
})
//修改企业
router.all('/modifyEp', async ctx => {
    var result = await api.modifyEp(ctx)
    logger.debug(`modifyEp:${JSON.stringify(result)}`)
    ctx.response.body = result
})
//修改添加number
router.all('/number', async ctx => {
    var result = await api.number(ctx)
    logger.debug(`number:${JSON.stringify(result)}`)
    ctx.response.body = result
})
router.all('/updateNumber', async ctx => {
    var result = await api.updateNumber(ctx)
    logger.debug(`updateNumber:${JSON.stringify(result)}`)
    ctx.response.body = result
})
module.exports = router
