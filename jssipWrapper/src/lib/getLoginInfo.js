'use strict';

import Logger from './Logger';
import SparkMD5 from 'spark-md5'

const logger = new Logger('getLoginInfo');
module.exports = {
    getLoginData,
    webApiHandler,
    loadServerFromJson,
    getInfo
};
/**
 * 1 通过json文件获取运维地址
 * 2 getInfo 获取运维信息
 * 3 getEpProfile 获取企业信息
 * 4 getMemberInfo 获取登录所选组
 * 5 updateInfo 更新模式
 */
async function getLoginData(un, pwd, switchNumber, callintype) {
    try {
        // 获取 运维服务器地址 
        var server = loadServerFromJson(switchNumber)
        if (server == undefined || server.length == 0)
            return ({ status: 50000, info: '获取失败', step: 'getESserver' })

        var PWD = SparkMD5.hash(pwd);
        var randkey1 = Math.random().toString().split('.')[1].substr(0, 8);//8位随机串
        var randkey2 = Math.random().toString().split('.')[1].substr(0, 6);//6位随机串

        var obj = {
            pwd: PWD,
            clearPwd: randkey1 + pwd + randkey2,
            switchNumber: switchNumber
        }
        localStorage.setItem('userData', JSON.stringify(obj));
        var infoData = await getInfo(un, pwd, switchNumber, server);
        if (infoData.status != 200) return (infoData);
        var webParam = {
            un: un,
            pwd: pwd,
            eid: infoData.data.eid
        }

        var EsInfo = await webApiHandler('getEpProfile', webParam);
        if (EsInfo.status != 200) return EsInfo;

        var memberInfo = await webApiHandler('getMemberInfo', webParam);
        if (memberInfo.status != 200) return memberInfo;

        webParam.jsonStr = JSON.stringify({ "data": { "callintype": callintype } });
        var updateInfo = await webApiHandler('updateInfo', webParam);
        if (updateInfo.status != 200) return updateInfo;

        return ({ status: 200, info: '获取成功', serverInfo: infoData.data, epInfo: EsInfo, memberInfo: memberInfo.returnData })
    }
    catch (err) {
        return ({ status: 50001, info: '获取失败' })
    }
}

// 通过json文件获取运维地址
function loadServerFromJson(number) {
    var jsonData = require('./province.json')
    var server = ''
    var TestDistricts = jsonData.TestDistricts;
    var CurDistricts = jsonData.CurDistricts;
    for (var i = 0; i < TestDistricts.length; i++) {
        if (TestDistricts[i].switchNumbers && TestDistricts[i].switchNumbers.split(',').indexOf(number) !== -1) {
            server = TestDistricts[i].uniServer;
            return server;
        }
    }
    for (var i = 0; i < CurDistricts.length; i++) {
        var data = CurDistricts[i].areaCode.split(',');
        for (var area of data) {
            if (number.startsWith(area)) {
                server = CurDistricts[i].uniServer;
                logger.debug(`${number} 运维地址 ${server}`);
                return server
            }
        }
    }
    logger.warn(`failed to find 运维服务器：${number}`);
}

// 获取企业服务器信息
async function getInfo(un, pwd, switchNumber, server) {
    try {
        var url = new URL('https://' + server + ':1047/Api/Client/getinfo');
        // getLoginData会在调用loadServerFromJson成功后设置
        // 单独测试getInfo方法加上|| {}
        var obj = JSON.parse(localStorage.getItem('userData')) || {};
        var params = {
            un: un,
            pwd: (obj && obj.pwd !== null && obj.pwd !== undefined) ? obj.pwd : SparkMD5.hash(pwd),
            switchNumber: switchNumber,
            cFlag: 1
        };
        url.search = new URLSearchParams(params);
        logger.debug(`await fetch ${url}`);
        let response = await fetch(url);
        let data = await response.json();
        if (Number(data.status) !== 0) return ({ status: 50002, info: data.info, step: 'getinfo' });
        obj.server = data.data.real_domain;
        obj.serverIp = data.data.domain;
        obj.eid = data.data.eid;
        obj.sipPort = data.data.port;

        var s = Number(data.data.eid).toString(16);
        var eid = "00000000" + s;
        eid = eid.substr(s.length, eid.length); // 截取最后8位字符
        obj.eid16 = eid;
        localStorage.setItem("userData", JSON.stringify(obj));

        var returnData = {
            domain: data.data.domain,
            sipPort: data.data.port,
            real_domain: data.data.real_domain,
            http_port: data.data.http_port,
            https_port: data.data.http_ports,
            epName: data.data.epName,
            eid: data.data.eid,
        }
        logger.debug(('getinfo:' + JSON.stringify(returnData)));
        return ({ status: 200, info: '获取运维信息成功', data: returnData })
    }
    catch (err) {
        logger.error(('getInfo' + err));
        return ({ status: 50001, info: err, step: 'getinfo' })
    }

}

/**
 * 
 * @param {请求方法名} functionName 
 * @param {请求参数} webParam 
 */
async function webApiHandler(functionName, webParam) {
    try {
        var obj = JSON.parse(localStorage.getItem('userData'));
        var server = obj.server;
        var baseUrl = 'https://' + server + '/Talk/Api/'
        webParam.pwd = (obj && obj.pwd !== null && obj.pwd !== undefined) ? obj.pwd : SparkMD5.hash(webParam.pwd);
        var url = new URL(baseUrl + functionName);
        url.search = new URLSearchParams(webParam);
        logger.debug(`${functionName} await fetch ${url}`);
        logger.debug(`${functionName} param ${JSON.stringify(webParam)}`);
        let response = await fetch(url);
        let resultData = await response.json();
        if (Number(resultData.status) !== 0) return { status: 50003, info: resultData.info, step: functionName };
        var returnData = {};
        // 返回数据处理
        switch (functionName) {
            case 'getEpProfile': {//获取企业属性 目前未确定用到哪些属性 
                var data = resultData.data.epProfile;
                returnData = {
                    dialing_display_set: data.dialing_display_set,
                    incoming_call_remind: data.incoming_call_remind,
                    outcallenterprisenumber: data.outcallenterprisenumber,
                    switch_number_public_set_mode: data.switch_number_public_set_mode,
                    switch_number_default: data.switch_number_default,
                    allow_customer_manager: data.allow_customer_manager,
                    allow_callcenter: data.allow_callcenter,
                    allow_auto_answer: data.allow_auto_answer,
                    allow_hide_number: data.allow_hide_number,
                    allow_worksheet: data.allow_worksheet,
                    allow_monitor: data.allow_monitor,
                    extension_end: data.extension_end,//分机号段结尾值
                    extension_start: data.extension_start,//分机号段起始值
                    allow_record_manager: data.allow_record_manager
                }
                obj.extension_end = data.extension_end;
                obj.extension_start = data.extension_start;
                localStorage.setItem("userData", JSON.stringify(obj));
                break;
            }
            case 'getGroups': {//获取所有技能组 暂时不处理层级结构
                var groupData = resultData.data;
                var groups = groupData.map(function (m) {
                    return {
                        id: m.id,
                        eid: m.eid,
                        name: m.name,
                    };
                });
                returnData = groups;
                break;
            }
            case 'getMemberInfo': {//获取用户所属技能组
                var data = resultData.data;
                var groups = data.inGroups.map(function (m) {
                    return {
                        id: m.id,
                        eid: m.eid,
                        name: m.name,
                    };
                });
                // 存储登录时选组信息
                obj.groupInfo = groups;
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
                obj.userInfo = userData;
                localStorage.setItem("userData", JSON.stringify(obj));
                returnData = {
                    userData: userData,
                    inGroups: groups
                }
                break;
            }
            case 'updateInfo': {//更新用户呼叫模式

                logger.debug((functionName + JSON.stringify(resultData)));
                returnData = resultData;
                break;
            }
            case 'searchEpMembers': {//获取技能组包含坐席
                var memberData = resultData.data.data;
                var members = memberData.map(function (ele) {
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
                        service_control: ele.service_control// 状态 0-离线 1-空闲 2-暂离 3-消息请求 4-呼叫请求 5-通话中 6-话后处理
                    };
                });
                returnData = { recordsTotal: resultData.data.recordsTotal, recordsFiltered: resultData.data.recordsFiltered, data: members };
                break;
            }
            case 'getMemberCallStates': {//获取坐席状态
                var element = resultData.data.filter(function (ele) {
                    return ele.uid == webParam.uid
                })
                returnData = element;
                break;
            }
            default: return { status: 50004, info: '未知请求' };
        }
        logger.debug((functionName + JSON.stringify(returnData)));
        return { status: 200, info: '获取成功', returnData: returnData };
    }
    catch (err) {
        logger.error((functionName + err));
        return { status: 50001, info: err, step: functionName };
    }

}
