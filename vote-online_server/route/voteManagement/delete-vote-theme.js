const voteManagementDao = require('../../dao/votemanagementDao')
module.exports=async (req,res)=>{
    const {id} = req.query
    const changedRows = await voteManagementDao.deleteVoteTheme(id)
    try{
        if(changedRows===1){
            res.send({
                code:'000',
                data:{
                    message:'删除成功'
                }
            })
        }else{
            res.send({
                code:'001',
                data:{
                    message:'该投票不存在'
                }
            })
        }
    }catch (err){
        res.send({
            code:'005',
            data:{
                message:`数据库错误${err}`
            }
        })
    }
}