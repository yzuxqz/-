const db = require('../db');
module.exports = {
    /**
     * 每日刷票
     * @returns {Promise<unknown>}
     */
    resetVoteNum: function () {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await db.query(
                   "UPDATE ip\n" +
                    "INNER JOIN vote_theme\n" +
                    "ON vote_theme.id = ip.vote_theme_id\n" +
                    "SET ip.last_num=vote_theme.vote_num\n" +
                    "WHERE vote_theme.everyday=1;"
                );
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    },
    /**
     * 查询是否有对应投票主题的ip表
     * @param userId
     * @returns {Promise<unknown>}
     */
    queryHasIpTable:function (userId, voteThemeId){
        return new Promise(async (resolve,reject)=>{
            try{
                const res = await db.query("SELECT * FROM ip WHERE user_id=? AND vote_theme_id=?",[userId,voteThemeId])
                resolve(res)
            }catch (err){
                reject(err)
            }
        })
    },
    /**
     * 增加ip数据
     */
    addIpLimit: function (vote_theme_id,last_num,ip,user_id,questionnaire_theme_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query("INSERT INTO ip(vote_theme_id,last_num,ip,user_id,questionnaire_theme_id) VALUES(?,?,?,?,?)", [vote_theme_id,last_num,ip,user_id,Number(questionnaire_theme_id)])
                resolve(result)
            } catch (err) {
                console.log(err);
            }
        })
    },
    queryIsVoteIpExist:function (ip,user_id,vote_theme_id){
      return new Promise(async (resolve,reject)=>{
          try{
              let result = await db.query("SELECT * FROM ip WHERE (ip=? AND user_id=? AND vote_theme_id=?)",[ip,user_id,vote_theme_id])
              resolve(result)
          }catch(err){
              reject(err)
          }
      })
    },
    /**
     * 查询某投票主题某id的所有数据
     */
    queryIpLimitVoteNum:function (ip,vote_theme_id){
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query("SELECT * FROM ip WHERE ip=? AND vote_theme_id=?", [ip,vote_theme_id])
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    },
    /**
     * 更新
     */
    upDateIpLastNum:function (id,last_num) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await db.query(
                    "UPDATE ip set last_num=? WHERE id=?",
                    [last_num, id]
                );
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    },

    /**
     * 查找对应用户的该主题的剩余票数
     */
    queryUserLastNum:function (user_id,vote_theme_id){
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query("SELECT * FROM ip WHERE user_id=? AND vote_theme_id=?", [user_id,vote_theme_id])
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    }
};