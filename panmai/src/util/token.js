var crypto = require('crypto')
// const { connectDB } = require('../database')
const path = require('path')

module.exports = {
    create: function(ip, user_name, password) {
        //运维域名生成
        //token通过ep_name + ep_id + maintenance + es_domain + 过期时间
        // var clientIp = getClientIp(req)
        var original = ip + user_name + password + Date.now()
        var md5 = crypto
            .createHash('md5')
            .update(original)
            .digest('hex')
        return {
            token: md5
        }
    },
    /**
     * token验证
     * @param es_domain和ep_id 唯一标识
     * @param token   token
     */
    autheration: async function(ctx) {
        let data = ctx.request.input_data
        // if (!isTokenVerify) return { status: 0, info: '认证成功' }
        // if (!token || token != data.token) throw { status: 30003, custom: true }
        return { status: 0, info: '认证成功' }
    }
}
