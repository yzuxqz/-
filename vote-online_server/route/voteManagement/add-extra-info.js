const voteManagementDao=require('../../dao/votemanagementDao')

module.exports=async (req,res)=>{
    const {content:type,value,options,label,vote_theme_id,required,name} = req.body
    try{
        const insertId = await voteManagementDao.addExtraInfo(type,value,options,label,vote_theme_id,required,name)
        res.send({
            code:'000',
            data:{
                message:'添加自定义表单成功',
                id:insertId
            }
        })
    }catch (err){
        res.send({
            code:'005',
            data:{
                message:'数据库出错',
                err
            }
        })
    }
}