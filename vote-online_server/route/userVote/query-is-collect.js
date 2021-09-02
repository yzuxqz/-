const  userVoteDao = require('../../dao/userVoteDao')
module.exports=async(req,res)=>{
    const {userId,voteThemeId} = req.query
    try{
        const isCollect = await userVoteDao.queryIsCollect(userId,voteThemeId)
        res.send({
            code:'000',
            data:{
                message:`查询收藏状态成功`,
                isCollect:isCollect[0]
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