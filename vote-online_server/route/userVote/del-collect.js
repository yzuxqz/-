const  userVoteDao = require('../../dao/userVoteDao')
module.exports=async(req,res)=>{
    const {userId,voteThemeId} = req.query
    try{
        const affectedRows = await userVoteDao.delCollect(userId,voteThemeId)
        res.send({
            code:'000',
            data:{
                message:`取消收藏成功`,
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