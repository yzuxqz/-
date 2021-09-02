const db = require('../db')

module.exports = {
    /**
     * 查询用户数量
     */
    queryUsersCount: function () {
        return new Promise((async (resolve, reject) => {
            try {
                const result = await db.query('SELECT count(*) FROM user')
                resolve(result[0]['count(*)'])
            } catch (err) {
                reject(err)
            }
        }))
    },

    /**
     * 分页查询用户
     */
    queryUsers: function (currentPage, pageSize) {
        return new Promise(async (resolve, reject) => {
            try{
                const result = await  db.query('SELECT * FROM user LIMIT ?,?', [(currentPage - 1) * pageSize, 1 * pageSize])
                resolve(result)
            }catch(err){
                reject(err)
            }
        })
    },

    /**
     * 删除单个用户
     */
    deleteUser: function (id) {
        return new Promise(async (resolve, reject) => {
            try{
                const {changedRows} = await db.query('UPDATE user SET exist=0 WHERE id=?', [id])
                resolve(changedRows)
            }catch (err){
                reject(err)
            }
        })
    },

    /**
     * 删除多个用户
     */
    deleteUsers:function (ids){
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await db.query('UPDATE `user` SET exist=0 where id in (?)',[ids])
                resolve(result.changedRows)
            }catch (err){
                reject(err)
            }
        })
    },

    /**
     * 恢复单个用户
     */
    restoreUser:function (id){
        return new Promise(async (resolve,reject)=>{
            try{
                const {changedRows} = await db.query('UPDATE `user` SET exist=1 where id=?',[id])
                resolve(changedRows)
            }catch (err){
                reject(err)
            }
        })
    }
}


