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
// 获取更新token
router.all('/getToken', async ctx => {
    var result = await api.getToken(ctx)
    logger.debug(`getToken:${JSON.stringify(result)}`)
    ctx.response.body = result
})
//  取消注册
router.all('/unregister', async ctx => {
    var result = await api.unregister(ctx)
    logger.debug(`unregister:${JSON.stringify(result)}`)
    ctx.response.body = result
})

module.exports = router
