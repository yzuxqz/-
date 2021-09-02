const db = require('../db')

module.exports = {
    /**
     * 检验用户是否已经注册
     */
    isUserExist: function (phone) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(`SELECT * FROM user WHERE phone=? AND exist=1`, [phone])
                resolve(result[0] !== undefined)
            } catch (err) {
                reject(err)
            }
        })
    },
    /**
     * 注册新用户
     */
    addUser: function (phone, email, password, userName, age, sex, ip) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query("INSERT INTO user(phone,email,password,userName, age,sex,ip) VALUES(?,?,?,?,?,?,?)", [phone, email, password, userName, age, sex, ip])
                resolve(result.insertId)
            } catch (err) {
                reject(err)
            }
        })
    }
}