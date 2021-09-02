const db = require('../db');
module.exports = {
    /**
     * 新增
     * @returns {Promise<unknown>}
     */
    firstJoined: function (user_id,vote_option_id,count) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await db.query('INSERT into option_joined(user_id,vote_option_id,count) VALUES(?,?,?)',[user_id,vote_option_id,count]);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    },
    /**
     * 查询count
     * @returns {Promise<unknown>}
     */
    queryCount:function (user_id,vote_option_id){
        return new Promise(async (resolve,reject)=>{
            try{
                const res = await db.query('SELECT count FROM option_joined WHERE user_id=? AND vote_option_id=?',[user_id,vote_option_id])
                resolve(res)
            }catch (err){
                reject(err)
            }
        })
    },
    updateCount:function (id,count){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await db.query('UPDATE option_joined SET count=? WHERE id=?',[count,id]);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    },
    /**
     * 查询是否存在
     */
    queryIsJoined:function (user_id,vote_option_id){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await db.query('SELECT * FROM option_joined WHERE user_id=? AND vote_option_id=?',[user_id,vote_option_id]);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    }
}