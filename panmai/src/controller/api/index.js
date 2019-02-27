const o_token = require('../../util/token')
const { connectDB, createDB } = require('../../database')
let debug = require('debug')('koa:DB')
/**
 * 总企业表
 * tb_allEnterprise
 * tb_server
 * 企业表
 * tb_enterprise
 */
/**
 *  @param  ep_id
 *  @param  ep_name
 *  @param  maintenance
 *  @param  createTime 创建时间如果不传取当前时间戳
 *  @param  es_domain
 *  @param  callback_url
 *  @param record_auth
 */
class enterprise {
    constructor() {
        //有一些错误检查是不必要的，如果update数是0，一定是给的查询条件不正确
        //insert如果没有外键限制，也不会不成功，而且外键限制是以异常形式丢出
    }
    async storeToken(data) {
        // let token = o_token.create(
        //     data.ep_id,
        //     data.ep_name,
        //     data.es_domain,
        //     data.maintenance
        // )
        // let ent = data.db_name //只要能唯一标识这家企业
        // await app.redisClient.setAsync(`yimi:token:${ent}`, token.token)
        // await app.redisClient.expireAsync(
        //     `yimi:token:${ent}`,
        //     token.expires_redis_time
        // )
        // return token
    }
    async storeInfo(data) {
        // //就明确只存这两个值
        // await app.redisClient.hsetAsync(
        //     `yimi:info:${data.es_domain}:${data.ep_id}`,
        //     'status',
        //     data.status
        // )
        // await app.redisClient.hsetAsync(
        //     `yimi:info:${data.es_domain}:${data.ep_id}`,
        //     'db_name',
        //     data.db_name
        // )
    }
    async registerEp(ctx) {
        let reqData = ctx.request.input_data
        // 企业参数
        console.log(reqData)
        let data = {}
        debug(`开始创建企业 ${data.es_domain}`)

        return { status: 0, info: 'success' }
    }

    // 修改企业
    //ep_id es_domain mt_domain（maintenance） 不可修改
    async modifyEp(ctx) {
        return { status: 0, info: 'success' }
    }
    // 获取token如果过去生成新的token并update
    /**
     *
     * @param {企业name} ep_name
     * @param {所属运维} mt_domain
     * @param {企业id} ep_id
     * @param {企业域名} es_domain
     */
    async getToken(ctx) {
        return { status: 0, info: 'success' }
    }
    /**
     *  req参数
     * @param {*} ep_id
     * @param {*} ep_name
     * @param {*} token
     * @param {*} mt_domain
     *
     */
    async unregister(ctx) {
        //成功返回
        return { status: 0, info: 'success', data: {} }
    }
    //企业名字前六位+_+max(id)+1
    createDbName(id) {
        id = id ? Number(id) + 1 : 1
        return 'emic' + ('00000000' + id).slice(-8) + '.db'
    }
}
module.exports = new enterprise()
