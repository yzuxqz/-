const db = require('../db');
module.exports = {
    isCollect:function (userId,voteThemeId){
        return new Promise(async (resolve,reject)=>{
            try {
                const res= await db.query(
                    "Select * from collect WHERE (user_id=? AND vote_theme_id=?)",
                    [userId, voteThemeId]
                );
                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    },
    addCollect: function (userId, voteThemeId) {
        return new Promise(async (resolve, reject) => {
                    try {
                        const {
                            insertId,
                        } = await db.query(
                            "INSERT INTO collect ( user_id,vote_theme_id) VALUES (?,?)",
                            [userId, voteThemeId]
                        );
                resolve(insertId);
            } catch (err) {
                reject(err);
            }
        });
    },
    changeAddCollect:function (userId, voteThemeId) {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    insertId,
                } = await db.query(
                    "UPDATE collect set exist=1 WHERE (user_id=? AND vote_theme_id=?)",
                    [userId, voteThemeId]
                );
                resolve(insertId);
            } catch (err) {
                reject(err);
            }
        });
    },
    delCollect: function (userId, voteThemeId) {
        return new Promise(async (resolve, reject) => {
            try {
                const {affectedRows} = await db.query(
                    "UPDATE collect set exist=0 WHERE (user_id=? AND vote_theme_id=?)",
                    [userId, voteThemeId]
                );
                resolve(affectedRows);
            } catch (err) {
                reject(err);
            }
        });
    },
    queryIsCollect: function (userId, voteThemeId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await db.query("SELECT exist from collect WHERE (user_id=? AND vote_theme_id=?)",
                    [userId, voteThemeId]
                );
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    },
    getHasVoteNumFormTheme:function (voteThemeId){
        return new Promise(async (resolve,reject)=>{
            try{
                const res= await db.query("SELECT * FROM `vote_theme` WHERE id=? ",[voteThemeId])
                resolve(res)
            }catch (e) {
                reject(e)
            }
        })
    }
};