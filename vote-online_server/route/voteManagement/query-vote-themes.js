const voteManagementDao=require('../../dao/votemanagementDao')

module.exports=async (req,res)=>{
    const {category,pageSize, currentPage} = req.query
    if(category){
        try{
            const result = await voteManagementDao.queryVoteThemeByCategory(category,pageSize,currentPage)
            res.send({
                code:'000',
                data:{
                    message:'分类列表已更新',
                    voteThemeList:result,
                }
            })
        }catch(err){
            res.send({
                code:'005',
                data:{
                    message:`数据库错误${err}`
                }
            })
        }
    }else{
        try {
            const result = await voteManagementDao.queryVoteThemes(pageSize, currentPage)
            res.send({
                code: '000',
                data: {
                    message: '投票列表已更新',
                    voteThemeList:result
                }
            })
        } catch (err) {
            res.send({
                code: '005',
                data: {
                    message:  `数据库错误${err}`
                }
            }) 
        }
    }
} 