const express = require('express')
const userManagement = express.Router()

/**
 * 分页查询用户&查询用户总数
 */
userManagement.get('/queryUsers', require('./userManagement/query-users'))

/**
 * 删除单个用户
 */
userManagement.get('/deleteUser', require('./userManagement/delete-user'))

/**
 * 删除多个用户
 */
userManagement.get('/deleteUsers', require('./userManagement/delete-users'))

/**
 * 恢复单个用户
 */
userManagement.get('/restoreUser', require('./userManagement/restore-user'))


module.exports = userManagement