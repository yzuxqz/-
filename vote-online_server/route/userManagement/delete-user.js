const userManagementDao = require('../../dao/userManagementDao')

module.exports = async (req, res) => {
    const {id} = req.query
    try{
        const changedRows = await userManagementDao.deleteUser(id)
        if (changedRows === 1) {
            res.send({
                code: '000',
                data: {
                    message: '删除成功'
                }
            })
        } else {
            res.send({
                code: '001',
                data: {
                    message: '用户不存在'
                }
            })
        }
    }catch (err){
        res.send({
            code:'005',
            message:`数据库错误${err}`
        })
    }
}