const INFO = {
    // 通用错误码
    '0': '呼叫中心接口请求成功',
    '200': '方法请求成功',
    '50000': '服务器错误',
    '50001': '接口参数错误',
    // 企业
    '30001': '参数错误',
    '30002': '企业未注册',
    '30003': 'token已过期',
    '30004': '不支持http方法',
    '30005': '企业已停用',
    '50006': '数据库出错', //数据库表中不存在该企业缺少字段/插入企业字段失败
    // 质检接口
    '50010': 'req参数解析失败',
    '50011': '录音下载失败',
    '50012': '录音文件解析失败，未找到坐席录音'
}
module.exports = CODE => {
    return INFO[CODE] ? INFO[CODE] : 'system error'
}