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
                userName: reqData.userName
            }
        })
        let ip = this.getUserIp(ctx)
        let { token } = o_token.create(ip, reqData.userName, reqData.passWord)
        if (ishas) {
            if (islogin) {
                if (ishas.passWord != reqData.passWord)
                    return { status: 301, info: '密码错误' }
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
        await new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })

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
    async number(ctx) {
        let data = ctx.input_params
        let type = data.type
        switch (type) {
            case '0':
                let ishas = await app.db.numberRecord.find({
                    where: {
                        number: data.number
                    }
                })
                if (ishas)
                    return { status: 301, info: '号码已存在', data: ishas }
                let addResult = await app.db.numberRecord.create({
                    number: data.number,
                    maxPrice: data.maxPrice || data.startPrice || 0,
                    startPrice: data.startPrice || 0,
                    status: data.status || 0,
                    createTime: new Date().getTime()
                })
                return { status: 0, info: '添加成功', data: addResult }
                break
            case '1':
                let limit = data.limit || 20
                let currentPage = data.currentPage || 1
                let offset = (currentPage - 1) * limit
                let list = await app.db.numberRecord.findAndCountAll({
                    limit: parseInt(limit),
                    offset: offset,
                    where: { status: data.status },
                    order: [['created_at', 'DESC']]
                })
                return { status: 0, info: 'success', data: list }
                break
            case '9':
                let removeResult = await app.db.numberRecord.destroy({
                    where: {
                        id: data.id.split(',')
                    }
                })
                return {
                    status: 0,
                    info: 'success',
                    data: removeResult
                }
                break
        }
    }
    async updateNumber(ctx) {
        let data = ctx.input_params
        let type = data.type
        let result = await app.db.user.find({
            where: { token: data.token }
        })
        if (!result)
            return {
                status: 400,
                info: '用户不存在',
                data: ishas
            }
        let ishas = await app.db.numberRecord.find({
            where: {
                id: data.id
            }
        })
        if (!ishas)
            return {
                status: 400,
                info: '号码不存在',
                data: ishas
            }
        if (ishas.maxPrice >= data.maxPrice)
            return {
                status: 400,
                info: '不能小于当前承诺价',
                data: ishas
            }
        let addResult = await app.db.numberRecord.update(
            {
                unit: data.unit,
                Auctioneer: data.userName,
                maxPrice: data.maxPrice
            },
            {
                where: {
                    id: data.id
                }
            }
        )
        let createLog = await app.db.log.create({
            userName: result.userName,
            log: `${ishas.number}号码${result.userName}加价到${data.maxPrice}`,
            userid: result.id,
            createTime: Date.now()
        })
        io.to('room').emit(
            'message',
            JSON.stringify({
                type: 'log',
                userName: createLog.userName,
                log: createLog.log,
                userid: createLog.userid,
                time: createLog.created_at
            })
        )
        io.to('room').emit(
            'message',
            JSON.stringify({
                type: 'updateNumber',
                id: data.id,
                unit: data.unit,
                Auctioneer: data.userName,
                maxPrice: data.maxPrice
            })
        )
        return { status: 0, info: 'success', addResult }
    }
    async remove() {}
}
module.exports = new enterprise()
