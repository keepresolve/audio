'use strict'

import Logger from './Logger'
import SparkMD5 from 'spark-md5'
import config from './config'
const logger = new Logger('getLoginInfo')

// https://stackoverflow.com/questions/4484424/underscore-prefix-for-property-and-method-names-in-javascript
// https://stackoverflow.com/questions/22097603/unit-testing-of-private-functions-with-mocha-and-node-js
// js convention that _ as private function, no need to export, but export for mochas test

/**
 * 1 通过json文件获取运维地址,未获取到会从运维接口获取
 * 2 getInfo 获取运维信息
 * 3 getEpProfile 获取企业信息
 * 4 getMemberInfo 获取登录所选组
 * 5 updateInfo 更新模式  callintype  -- 2 voip  4 电路  5 sip话机
 */
async function getLoginData(un, pwd, switchNumber, callintype, phoneNumber) {
    try {
        // 参数校验
        if (
            un == undefined ||
            pwd == undefined ||
            switchNumber == undefined ||
            callintype == undefined ||
            ((Number(callintype) == 4 || Number(callintype) == 5) &&
                phoneNumber == undefined)
        )
            throw {
                status: 50001,
                info: '获取信息失败,参数错误',
                step: 'checkParam'
            }

        // 获取 运维服务器地址
        var server = await loadServerFromJson(switchNumber)
        if (server == undefined || server.length == 0)
            throw {
                status: 50002,
                info: '获取运维地址失败',
                step: 'getESserver'
            }
        var PWD = SparkMD5.hash(pwd)
        var randkey1 = Math.random()
            .toString()
            .split('.')[1]
            .substr(0, 8) //8位随机串
        var randkey2 = Math.random()
            .toString()
            .split('.')[1]
            .substr(0, 6) //6位随机串

        var obj = {
            pwd: PWD,
            clearPwd: randkey1 + pwd + randkey2,
            switchNumber: switchNumber,
            callintype: callintype,
            oldCallType: callintype
        }
        if (Number(callintype) == 4)
            obj.phoneNumber =
                phoneNumber.startsWith('A') && phoneNumber.endsWith('Z')
                    ? phoneNumber.slice(1, phoneNumber.length - 1)
                    : phoneNumber
        if (Number(callintype) == 5) obj.sipNumber = phoneNumber
        var userData = localStorage.getItem('userData')
        userData
            ? localStorage.setItem(
                  'userData',
                  JSON.stringify(Object.assign(JSON.parse(userData), obj))
              )
            : localStorage.setItem('userData', JSON.stringify(obj))
        var infoData = await getInfo(un, pwd, switchNumber, server)
        if (infoData.status != 200) throw infoData
        var webParam = {
            un: un,
            pwd: pwd,
            eid: infoData.data.eid
        }

        var EsInfo = await webApiHandler('getEpProfile', webParam)
        if (EsInfo.status != 200) throw EsInfo

        var memberInfo = await webApiHandler('getMemberInfo', webParam)
        if (memberInfo.status != 200) throw memberInfo

        // 回拨话机号码需要加一下校验   这边加一个入口，，如果号码是 A135...Z格式,或企业开关关闭则跳过验证
        if (
            Number(callintype) == 4 &&
            !(
                (phoneNumber.startsWith('A') && phoneNumber.endsWith('Z')) ||
                (JSON.parse(localStorage.userData).epInfo.terminal_need_reg &&
                    Number(
                        JSON.parse(localStorage.userData).epInfo
                            .terminal_need_reg
                    ) == 0)
            )
        ) {
            var checkData = await checkRegisterStatus({
                mobile: phoneNumber,
                eid: infoData.data.eid
            })
            if (checkData.status != 200) throw checkData
        }
        // 修改sip话机号/ 回拨话机号
        var data = {
            callintype: callintype
        }

        if (Number(callintype) == 4)
            data.telephone =
                phoneNumber.startsWith('A') && phoneNumber.endsWith('Z')
                    ? phoneNumber.slice(1, phoneNumber.length - 1)
                    : phoneNumber
        if (Number(callintype) == 5) data.sip_telephone = phoneNumber
        webParam.jsonStr = JSON.stringify({ data: data })

        var updateInfo = await webApiHandler('updateInfo', webParam)
        if (updateInfo.status != 200) throw updateInfo

        return {
            status: 200,
            info: '获取成功',
            serverInfo: infoData.data,
            epInfo: EsInfo,
            memberInfo: memberInfo.returnData
        }
    } catch (err) {
        logger.error(`获取登录信息失败 ${err}`)
        localStorage.removeItem('userData')
        return err
    }
}

/**
 * 通过json文件获取运维地址,未找到就先获取区号再去运维获取服务器地址
 */

async function loadServerFromJson(number) {
    var jsonData = require('./province.json')
    var server = ''
    var TestDistricts = jsonData.TestDistricts
    var CurDistricts = jsonData.CurDistricts
    for (var i = 0; i < TestDistricts.length; i++) {
        if (
            TestDistricts[i].switchNumbers &&
            TestDistricts[i].switchNumbers.split(',').indexOf(number) !== -1
        ) {
            server = TestDistricts[i].uniServer
            logger.debug(`${number} 运维地址 ${server}`)
            return server
        }
    }
    for (var i = 0; i < CurDistricts.length; i++) {
        var data = CurDistricts[i].areaCode.split(',')
        for (var area of data) {
            if (number.startsWith(area)) {
                server = CurDistricts[i].uniServer
                logger.debug(`${number} 运维地址 ${server}`)
                return server
            }
        }
    }
    if (!server) {
        var provinceData = await queryAddrByAreaCode(number)
        if (provinceData.status != 200) throw provinceData
        var province = provinceData.data

        var serverData = await loadServer()
        if (serverData.status != 200) throw serverData
        var yunweiList = serverData.data

        for (var i = 0; i < yunweiList.length; i++) {
            if (province.startsWith(yunweiList[i].province)) {
                server = yunweiList[i].s_client_domain
                logger.debug(`${number} 运维地址 ${server}`)
                return server
            }
        }
    }
}

/**
 * 区号查询省份
 * @param {总机号} number
 */

async function queryAddrByAreaCode(number) {
    var apiKey = config.queryAreaCode.apiKey
    var areaCode = number.substr(0, 4)
    try {
        var url = new URL(
            'https://api.apishop.net/common/postcode/queryAddrByAreaCode'
        )
        var params = {
            apiKey: apiKey,
            areaCode: areaCode
        }
        url.search = new URLSearchParams(params)
        logger.debug(`await fetch ${url}`)
        let response = await fetch(url)
        let data = await response.json()
        if (data.statusCode !== '000000' || data.result.length == 0)
            return {
                status: 50002,
                info: data.desc,
                step: 'queryAddrByAreaCode'
            }
        var province = data.result[0].province
        logger.debug(`区号查询 await fetch ${province}`)
        return { status: 200, info: '区号查询成功', data: province }
    } catch (err) {
        logger.error('AreaCode' + err)
        return { status: 50000, info: err, step: 'queryAddrByAreaCode' }
    }
}

/**
 * 获取运维列表所需的key
 * @param {版本号} v
 * @param {当前时间} t
 * @param {随即串} salt
 * @param {约定key} key
 */
async function _getSignKey(params) {
    try {
        var url = new URL(
            `http://${config.superServerInfo.host}:${
                config.superServerInfo.port
            }/Api/Client/getSignKey`
        )

        params.sign = SparkMD5.hash(
            params.v + params.t + params.salt + config.signKey.key
        )
        url.search = new URLSearchParams(params)
        logger.debug(`await fetch ${url}`)
        let response = await fetch(url)
        let data = await response.json()
        if (Number(data.status) !== 0)
            return { status: 50002, info: data.info, step: 'getSignKey' }
        var res = data.data
        return { status: 200, info: '获取加密串成功', data: res }
    } catch (err) {
        logger.error('SignKey' + err)
        return { status: 50000, info: err, step: 'getSignKey' }
    }
}
/**
 * 获取运维列表 这里需要先调用getSignKey获取加密key
 */

async function loadServer() {
    try {
        var params = {
            v: config.signKey.version,
            t: Date.now(),
            salt: Math.random()
                .toString()
                .split('.')[1]
                .substr(0, 6)
        }
        var res = await _getSignKey(params)
        if (res.status != 200) return res
        var key = res.data
        var url = new URL(
            `http://${config.superServerInfo.host}:${
                config.superServerInfo.port
            }/Api/Client/getMtServerList`
        )

        params.sign = SparkMD5.hash(
            params.v + params.t + key + SparkMD5.hash(params.salt)
        )
        url.search = new URLSearchParams(params)
        logger.debug(`await fetch ${url}`)
        let response = await fetch(url)
        let data = await response.json()
        if (Number(data.status) !== 0)
            return { status: 50002, info: data.info, step: 'loadServer' }
        var res = data.data
        // logger.debug(`运维地址列表 await fetch ${JSON.stringify(res)}`)
        return { status: 200, info: '获取运维列表成功', data: res }
    } catch (err) {
        logger.error('serverList' + err)
        return { status: 50000, info: err, step: 'loadServer' }
    }
}

// 获取企业服务器信息
async function getInfo(un, pwd, switchNumber, server) {
    try {
        var url = new URL('https://' + server + ':1047/Api/Client/getinfo')
        // getLoginData会在调用loadServerFromJson成功后设置
        // 单独测试getInfo方法加上|| {}
        //确认有值才可以直接 localStorage.userData 这里不可以
        var obj = JSON.parse(localStorage.getItem('userData')) || {}
        var params = {
            un: un,
            pwd:
                obj && obj.pwd !== null && obj.pwd !== undefined
                    ? obj.pwd
                    : SparkMD5.hash(pwd),
            switchNumber: switchNumber,
            cFlag: 1
        }
        url.search = new URLSearchParams(params)
        logger.debug(`await fetch ${url}`)
        let response = await fetch(url)
        let data = await response.json()
        if (Number(data.status) !== 0) {
            if (
                Number(data.status) == 4 ||
                Number(data.status) == 7 ||
                Number(data.status) == 8
            )
                return { status: 50003, info: data.info, step: 'getinfo' }
            if (Number(data.status) == 3 || Number(data.status) == 6)
                return { status: 50004, info: data.info, step: 'getinfo' }
            else return { status: 50000, info: data.info, step: 'getinfo' }
        }

        obj.server = data.data.real_domain
        obj.serverIp = data.data.domain
        obj.eid = data.data.eid
        obj.sipPort = data.data.port

        var s = Number(data.data.eid).toString(16)
        var eid = '00000000' + s
        eid = eid.substr(s.length, eid.length) // 截取最后8位字符
        obj.eid16 = eid
        localStorage.setItem('userData', JSON.stringify(obj))

        var returnData = {
            domain: data.data.domain,
            sipPort: data.data.port,
            real_domain: data.data.real_domain,
            http_port: data.data.http_port,
            https_port: data.data.http_ports,
            epName: data.data.epName,
            eid: data.data.eid
        }
        logger.debug('getinfo:' + JSON.stringify(returnData))
        return { status: 200, info: '获取运维信息成功', data: returnData }
    } catch (err) {
        logger.error('getInfo' + err)
        return { status: 50000, info: err, step: 'getinfo' }
    }
}

// 校验回拨话机号码
async function checkRegisterStatus(params) {
    try {
        var obj = JSON.parse(localStorage.userData)
        var url = new URL(
            'https://' + obj.server + '/Talk/Mapi/checkRegisterStatus'
        )
        url.search = new URLSearchParams(params)
        logger.debug(`await fetch ${url}`)
        let response = await fetch(url)
        let data = await response.json()
        if (Number(data.status) !== 0)
            return {
                status: 50006,
                info: data.info,
                step: 'checkRegisterStatus'
            }
        logger.debug('checkRegisterStatus:' + JSON.stringify(data))
        return { status: 200, info: '回拨号码校验成功' }
    } catch (err) {
        logger.error('checkRegisterStatus' + err)
        return { status: 50000, info: err, step: 'checkRegisterStatus' }
    }
}
/**
 *
 * @param {请求方法名} functionName
 * @param {请求参数} webParam
 */
async function webApiHandler(functionName, webParam) {
    try {
        var obj = JSON.parse(localStorage.userData)
        var server = obj.server
        var baseUrl = 'https://' + server + '/Talk/Api/'
        webParam.pwd =
            obj && obj.pwd !== null && obj.pwd !== undefined
                ? obj.pwd
                : SparkMD5.hash(webParam.pwd)
        var url = new URL(baseUrl + functionName)
        url.search = new URLSearchParams(webParam)
        logger.debug(`${functionName} await fetch ${url}`)
        logger.debug(`${functionName} param ${JSON.stringify(webParam)}`)
        let response = await fetch(url)
        let resultData = await response.json()
        var returnData = {}
        // 返回数据处理
        switch (functionName) {
            case 'getEpProfile': {
                if (Number(resultData.status) !== 0)
                    return {
                        status: 50005,
                        info: resultData.info,
                        step: functionName
                    }
                //获取企业属性 目前未确定用到哪些属性
                var data = resultData.data.epProfile
                returnData = {
                    dialing_display_set: data.dialing_display_set,
                    incoming_call_remind: data.incoming_call_remind,
                    outcallenterprisenumber: data.outcallenterprisenumber,
                    switch_number_public_set_mode:
                        data.switch_number_public_set_mode,
                    switch_number_default: data.switch_number_default,
                    allow_customer_manager: data.allow_customer_manager,
                    allow_callcenter: data.allow_callcenter,
                    allow_auto_answer: data.allow_auto_answer, //sip话机自动应答开关 0-关闭 1-开启
                    auto_answer_duration: data.auto_answer_duration, //自动应答时长 范围：3、5、8
                    terminal_need_reg: data.terminal_need_reg, //回拨话机校验开关 0-关闭 1-开启
                    allow_hide_number: data.allow_hide_number,
                    allow_worksheet: data.allow_worksheet,
                    allow_monitor: data.allow_monitor,
                    extension_end: data.extension_end, //分机号段结尾值
                    extension_start: data.extension_start, //分机号段起始值
                    allow_record_manager: data.allow_record_manager
                }
                var epInfo = {
                    allow_auto_answer: data.allow_auto_answer,
                    auto_answer_duration: data.auto_answer_duration,
                    terminal_need_reg: data.terminal_need_reg,
                    extension_end: data.extension_end,
                    extension_start: data.extension_start
                }
                obj.epInfo = epInfo
                localStorage.setItem('userData', JSON.stringify(obj))
                break
            }
            case 'getMemberInfo': {
                //获取用户所属技能组
                if (Number(resultData.status) !== 0)
                    return {
                        status: 50005,
                        info: resultData.info,
                        step: functionName
                    }
                var data = resultData.data
                var groups = data.inGroups.map(function(m) {
                    return {
                        id: m.id,
                        eid: m.eid,
                        name: m.name
                    }
                })
                // 存储登录时选组信息
                obj.groupInfo = groups
                var userData = {
                    id: data.id,
                    eid: data.eid,
                    uid: data.uid,
                    displayname: data.displayname,
                    number: data.number,
                    work_number: data.work_number,
                    duty: data.duty,
                    mobile: data.mobile,
                    outside_callnumber: data.outside_callnumber,
                    address: data.address,
                    permission: data.permission,
                    call_limit: data.call_limit,
                    time_limit: data.time_limit,
                    cur_limit_time: data.cur_limit_time
                }
                obj.userInfo = userData
                localStorage.setItem('userData', JSON.stringify(obj))
                returnData = {
                    userData: userData,
                    inGroups: groups
                }
                break
            }
            case 'updateInfo': {
                //更新用户呼叫模式
                if (Number(resultData.status) !== 0)
                    return {
                        status: 50005,
                        info: resultData.info,
                        step: functionName
                    }
                logger.debug(functionName + JSON.stringify(resultData))
                returnData = resultData
                break
            }
            case 'getGroups': {
                //获取所有技能组 暂时不处理层级结构
                if (Number(resultData.status) !== 0)
                    return {
                        status: 50008,
                        info: resultData.info,
                        step: functionName
                    }
                var groupData = resultData.data
                var groups = groupData.map(function(m) {
                    return {
                        id: m.id,
                        eid: m.eid,
                        name: m.name
                    }
                })
                returnData = groups
                break
            }
            case 'searchEpMembers': {
                //获取技能组包含坐席
                if (Number(resultData.status) !== 0)
                    return {
                        status: 50009,
                        info: resultData.info,
                        step: functionName
                    }
                var memberData = resultData.data.data
                var members = memberData.map(function(ele) {
                    return {
                        id: ele.eid,
                        eid: ele.eid,
                        uid: ele.uid,
                        displayname: ele.displayname,
                        number: ele.number,
                        mobile: ele.mobile,
                        telephone: ele.telephone,
                        pinyin: ele.pinyin,
                        outside_callnumber: ele.outside_callnumber,
                        address: ele.address,
                        gids: ele.gids,
                        gName: ele.gName,
                        service_callmode: ele.service_callmode, //呼叫模式
                        service_control_time: ele.service_control_time,
                        service_control: ele.service_control // 状态 0-离线 1-空闲 2-暂离 3-消息请求 4-呼叫请求 5-通话中 6-话后处理
                    }
                })
                returnData = {
                    recordsTotal: resultData.data.recordsTotal,
                    recordsFiltered: resultData.data.recordsFiltered,
                    data: members
                }
                break
            }
            case 'getMemberCallStates': {
                if (Number(resultData.status) !== 0)
                    return {
                        status: 50010,
                        info: resultData.info,
                        step: functionName
                    }
                //获取坐席状态
                var element = resultData.data.filter(function(ele) {
                    return ele.uid == webParam.uid
                })
                returnData = element
                break
            }
            default:
                return { status: 50007, info: '未知请求' }
        }
        logger.debug(functionName + JSON.stringify(returnData))
        return { status: 200, info: '获取成功', returnData: returnData }
    } catch (err) {
        logger.error(functionName + err)
        return { status: 50000, info: err, step: functionName }
    }
}

module.exports = {
    getLoginData,
    webApiHandler,
    _loadServerFromJson: loadServerFromJson,
    _getInfo: getInfo,
    _queryAddrByAreaCode: queryAddrByAreaCode,
    _loadServer: loadServer
}
