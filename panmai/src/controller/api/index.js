const o_token = require('../../util/token')
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
    constructor() {}
    getUserIp(ctx) {
        return (
            ctx.req.headers['x-forwarded-for'] ||
            ctx.req.connection.remoteAddress ||
            ctx.req.socket.remoteAddress ||
            ctx.req.connection.socket.remoteAddress
        )
    }
    async login(ctx) {
        let reqData = ctx.input_params
        let islogin = reqData.type == 1

        let user = app.db.user
        let ishas = await user.find({
            where: {
                userName: reqData.userName,
                passWord: reqData.passWord
            }
        })
        let ip = this.getUserIp(ctx)
        let { token } = o_token.create(ip, reqData.userName, reqData.passWord)
        if (ishas) {
            if (islogin) {
                let result = await user.update(
                    {
                        token
                    },
                    {
                        where: {
                            id: ishas.id
                        }
                    }
                )
                let data = await user.findById(ishas.id)
                ctx.session.token = data.userName
                return { status: 0, info: '登陆成功', data }
            } else {
                return { status: 301, info: '用户名已存在' }
            }
        } else {
            if (islogin) {
                return { status: 404, info: '用户名不存在' }
            } else {
                let result = await user.create({
                    userName: reqData.userName,
                    passWord: reqData.passWord,
                    unit: reqData.unit,
                    token
                })
                return { status: 0, info: '注册成功', result }
            }
        }
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
