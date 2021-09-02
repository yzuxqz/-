const express = require('express')
const login = express.Router()


/**
 * 校验登录状态
 */
login.get('/isLogin',require('./login/is-login'))
/**
 * 获取验证码
 */
login.get("/message", require('./login/message'))

/**
 * 快捷登录
 */
login.get("/fastLoginIn", require('./login/fast-login-in'))

/**
 * 密码登录
 */
login.post("/pwdLoginIn", require('./login/pwd-login-in'))

/**
 * 忘记密码
 */
login.post("/forgetPwd", require('./login/forget-pwd'))

module.exports = login
