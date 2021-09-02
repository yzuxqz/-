const personalInfoDao = require('../../dao/personalInfoDao')

module.exports=async(req,res)=>{
    const {phone,email,userName,age,sex,id} = req.body
    try{
        let result = await personalInfoDao.updatePersonalInfo(phone,email,userName,age,sex,id)
        if(result.affectedRows===1){
            let user = await personalInfoDao.getUserById(id)
            req.session.user = user[0]
            res.send({
                code:'000',
                data:{
                    user,
                    message:`修改成功`
                }
            })
        }
    }catch (e) {
        res.send({
            code:'005',
            data:{
                message:`数据库错误${e}`
            }
        })
    }
}