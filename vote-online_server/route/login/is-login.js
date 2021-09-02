module.exports=(req,res)=>{
    if (req.cookies['connect.sid'] && req.cookies['connect.sid'].includes(req.sessionID)){

        res.send({
            code:'000',
            data:{
                message:'登录状态校验成功！',
                user:req.session.user,
            }
        })
    }else{
        res.send({
            code:'001',
            data:{
                message:'请先进行登录'
            }
        })
    }
}