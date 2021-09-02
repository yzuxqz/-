const db = require('../db')

module.exports = {
    /**
     * 密码登录
     */
    userPwdLogin: function (account, password) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(`SELECT * FROM user WHERE (phone=? or userName=? )and password=? and exist=1`, [account, account, password])
                console.log(result);
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    },
    /**
     * 快速登录
     */
    fastLogin: function (phone) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(`SELECT * FROM user WHERE phone=? AND exist=1`, [phone])
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    },
    /**
     * 管理员登录
     */
    adminLogin: function (account, password) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(`SELECT * FROM admin WHERE account=? AND password=?`, [account, account, password])
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    },
    /**
     * 忘记密码
     */
    forgetPwd: function (password, phone) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query('UPDATE `user` SET `password`=? WHERE phone=? AND exist=1', [password, phone])
                resolve(result.affectedRows)
            } catch (err) {
                reject(err)
            }
        })
    }
}