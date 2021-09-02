const db = require('../db');
module.exports = {
    updatePersonalInfo:function (phone,email,userName,age,sex,id){
        return new Promise(async (resolve,reject)=>{
            try {
                const res= await db.query(
                    "UPDATE user SET phone=?,email=?,userName=?,age=?,sex=? WHERE id=?",
                    [phone,email,userName,age,sex,id]
                );
                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    },
    getUserById:function (id){
        return new Promise(async (resolve,reject)=>{
            try{
                const res = await db.query(
                    "SELECT * from user WHERE id = ?",
                    [id]
                )
                resolve(res)
            }catch (err){
                reject(err)
            }
        })
    }
};