const md5 = require('blueimp-md5')
const moment = require('moment')
const Base64 = require('js-base64').Base64;
const request = require('request');

/**
 * 生成指定长度的随机数
 * @param length 随机数长度
 * @returns {string}
 */
exports.randomCode = function randomCode(length) {
    let chars = ['0','1','2','3','4','5','6','7','8','9'];
    let result = ""; //统一改名: alt + shift + R
    for(let i = 0; i < length ; i ++) {
        let index = Math.ceil(Math.random()*9);
        result += chars[index];
    }
    return result;
}

/**
 * 向指定号码发送指定验证码
 * @param phone 手机号
 * @param code  验证码
 * @param callback 返回结果
 */
exports.sendCode = function sendCode(phone, code, callback) {
    let ACCOUNT_SID = '8a216da8777ce3fd0177b7fccfe60826';
    let AUTH_TOKEN = 'fd66db0e8e0748e2930c09d1da68d636';
    let Rest_URL = 'https://app.cloopen.com:8883';
    let AppID = '8a216da8777ce3fd0177b7fcd0fa082d';
    //1. 准备请求url
    /*
     1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
     时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
     2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
     */
    let sigParameter = '';
    let time = moment().format('YYYYMMDDHHmmss');
    sigParameter = md5(ACCOUNT_SID+AUTH_TOKEN+time);
    let url = Rest_URL+'/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+sigParameter;

    //2. 准备请求体
    let body = {
        to : phone,
        appId : AppID,
        templateId : '1',
        "datas":[code,"1"]
    }

    //3. 准备请求头
    /*
     1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
     2.冒号为英文冒号
     3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
     */
    let authorization = ACCOUNT_SID + ':' + time;
    authorization = Base64.encode(authorization);
    let headers = {
        'Accept' :'application/json',
        'Content-Type' :'application/json;charset=utf-8',
        'Content-Length': JSON.stringify(body).length+'',
        'Authorization' : authorization
    }

    //4. 发送请求, 并得到返回的结果, 调用callback
    request({
        method : 'POST',
        url : url,
        headers : headers,
        body : body,
        json : true
    }, function (error, response, body) {
        callback(body.statusCode==='000000');
    });
}
