var crypto = require('crypto')
// const { connectDB } = require('../database')
const path = require('path')

module.exports = {
    create: function(ep_id, ep_name, es_domain, maintenance) {
        //运维域名生成
        //token通过ep_name + ep_id + maintenance + es_domain + 过期时间
        // var clientIp = getClientIp(req)
        var original = ep_name + ep_id + maintenance + es_domain
        var expires_time =
            parseInt(Date.now() / 1000) +
            parseInt(process.env.auth_expires_time + 100)
        var expires_redis_time = parseInt(process.env.auth_expires_time + 100)
        var md5 = crypto
            .createHash('md5')
            .update(original + expires_time)
            .digest('hex')
        var sha224md5 = crypto
            .createHash('sha224')
            .update(md5)
            .digest('hex')
        return {
            token: sha224md5,
            expriseTime: expires_time,
            expires_redis_time
        }
    },
    /**
     * token验证
     * @param es_domain和ep_id 唯一标识
     * @param token   token
     */
    autheration: async function(ctx, isTokenVerify) {
        let data = ctx.request.input_data
        // if (!isTokenVerify) return { status: 0, info: '认证成功' }
        // if (!token || token != data.token) throw { status: 30003, custom: true }
        return { status: 0, info: '认证成功' }
    }
}
