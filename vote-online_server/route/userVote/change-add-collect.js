const  userVoteDao = require('../../dao/userVoteDao')
module.exports=async(req,res)=>{
    const {userId,voteThemeId} = req.query
    try{
        const affectedRows = await userVoteDao.changeAddCollect(userId,voteThemeId)
        res.send({
            code:'000',
            data:{
                message:`收藏成功`,
                affectedRows
            }
        })
    }catch (e) {
        res.send({
            code:'005',
            data:{
                message:`数据库错误${e}`
            }
        })
    }
}