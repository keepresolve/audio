const router = require('koa-router')()
var enterprise = require('../controller/enterprise')
// router.prefix(process.env.baseUri) //第一版
//注册企业
router.all('/registerEp', async ctx => {
    var result = await enterprise.registerEp(ctx)
    logger.debug(`registerEp:${JSON.stringify(result)}`)
    ctx.response.body = result
})
//修改企业
router.all('/modifyEp', async ctx => {
    var result = await enterprise.modifyEp(ctx)
    logger.debug(`modifyEp:${JSON.stringify(result)}`)
    ctx.response.body = result
})
// 获取更新token
router.all('/getToken', async ctx => {
    var result = await enterprise.getToken(ctx)
    logger.debug(`getToken:${JSON.stringify(result)}`)
    ctx.response.body = result
})
//  取消注册
router.all('/unregister', async ctx => {
    var result = await enterprise.unregister(ctx)
    logger.debug(`unregister:${JSON.stringify(result)}`)
    ctx.response.body = result
})

module.exports = router
