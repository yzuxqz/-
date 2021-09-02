const express = require('express')
const register = express.Router()

/**
 * 用户注册
 */
register.post("/addNormalUser",require('./register/add-normal-user') )

module.exports = register