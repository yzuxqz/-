const voteManagementDao = require('../../dao/votemanagementDao')
module.exports=async(req,res)=>{
    const {id} = req.query
    try{
        const result =await voteManagementDao.queryVoteOptions(id)
        result.forEach(item => {
            item.img = global.baseURL+item.img
        });
        res.send({
            code:'000',
            data:{
                message:'投票选项已更新',
                options:result
            }
        })
    }catch (err) {
        res.send({
            code:'005',
            data:{
                message:`数据库错误${err}`
            } 
        })
    }
} 