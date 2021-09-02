import {request} from '../request'

/**
 * 校验登录状态
 */
export function isLogin(){
    return request({
        method:'get',
        url:'/login/isLogin'
    })
}
/**
 * 获取验证码
 */
export function getMessage(phone) {
    return request({
        method: 'get',
        url: '/login/message',
        params: {
            phone
        }
    })
}

/**
 * 快捷登录
 */
export function fastLoginIn(phone, verifyMessage) {
    return request({
        method: 'get',
        url: '/login/fastLoginIn',
        params: {
            phone,
            verifyMessage
        }
    })
}

/**
 * 密码登录
 */
export function pwdLoginIn(account,password,role){
    return request({
        method:'post',
        url:'/login/pwdLoginIn',
        data:{
            account,
            password,
            role
        }
    })
}

/**
 * 忘记密码
 */
export function forgetPwd(phone,message,password){
    return request({
        method:'post',
        url:'/login/forgetPwd',
        data:{
            phone,
            message,
            password
        }
    })
}