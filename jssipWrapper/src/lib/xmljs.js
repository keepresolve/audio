import Logger from './Logger';
const logger = new Logger('xml2json');
// xml -> js，只能在浏览器跑：DOMParser
function xmlToJs(str) {
  // a 
  // b
  // c ccnumber
  // f 是否进入话后处理（0-不进，1-进）
  // g gid_eid
  // k k=-1表示从批量外呼任务中添加或删除登陆坐席，此902状态不用向web端请求批量外呼状态
  // o 
  // i CallId
  // m 模式
  // n        主叫号码
  // p 回拨号码/话机号码    IVR节点号  外呼显示号码
  // r 121消息  200表示成功收到   404
  // s 状态   被叫号码
  // t 被叫号码  分机号_企业号
  // q
  // n 分机号_企业号
  // v 2:网络 4：回拨 5：sip话机
  // z
  var arr = ['a', 'b', 'c', 'f', 'g', 'k', 'o', 'i', 'm', 'n', 'p', 'r', 's', 't', 'q', 'n', 'v', 'z','l']
  var arrlen = arr.length
  var topName = ['cc', 'o', 'mn', 'i']
  var a = {}
  for (var j = 0; j < topName.length; j++) {
    if (xmlToDom(str).getElementsByTagName(topName[j]).length) {
      var top;
      top = topName[j]
      var xmlDom = xmlToDom(str).getElementsByTagName(topName[j])[0]
      var obj = {}
      for (var i = 0; i < arrlen; i++) {
        if (xmlDom.getAttribute(arr[i])) {
          obj[arr[i]] = xmlDom.getAttribute(arr[i])
        }
      }
      // 一级赋值
      a[top] = obj
      if (xmlToDom(str).getElementsByTagName(topName[j])[0].childNodes.length > 0) {
        // 获取所有子节点
        var childNodes = xmlToDom(str).getElementsByTagName(topName[j])[0]
        var childArray = [];
        for (var i = 0, len = childNodes.children.length; i < len; i++) {
          var childObj = {};
          var demo = xmlToDom(childNodes.children[i].outerHTML).getElementsByTagName(childNodes.children[0].localName)[0]
          for (var k = 0; k < arrlen; k++) {
            if (demo.getAttribute(arr[k])) {
              childObj[arr[k]] = demo.getAttribute(arr[k])
            }
          }
          childArray.push(childObj)
        }
        // 二级赋值
        a[top][xmlToDom(str).getElementsByTagName(topName[j])[0].children[0].localName] = childArray
      }
    }
  }
  return a
}


// js -> xml
function jsToXml(obj) {
  var cc = xmlToDom('<cc />').getElementsByTagName('cc')[0]
  for (var k in obj) {
    cc.setAttribute(k, obj[k])
  }
  return '<?xml version="1.0" encoding="utf-8"?>' + domToStr(cc)
}


function domToStr(node) {
  let tmpNode = document.createElement('div')
  tmpNode.appendChild(node)
  let str = tmpNode.innerHTML
  tmpNode = node = null; // 解除引用，以便于垃圾回收  
  return str;
}

// https://blog.csdn.net/medivhq/article/details/44647329
function xmlToDom(xmlString) {
  var xmlDoc = null;
  if (!window.DOMParser && window.ActiveXObject) { // 兼容ie浏览器
    var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
    for (var i = 0; i < xmlDomVersions.length; i++) {
      try {
        xmlDoc = new ActiveXObject(xmlDomVersions[i]);
        xmlDoc.async = false;
        xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
        break;
      } catch (e) {}
    }
  } else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
    try {
      var domParser = null
      domParser = new DOMParser();
      xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
    } catch (e) {}
  } else {
    return null;
  }
  return xmlDoc;
}

module.exports = {
  xmlToJs,
  jsToXml
};