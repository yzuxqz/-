const userManagementDao = require('../../dao/userManagementDao')
module.exports = async (req, res) => {
    let {ids} = req.query
    // try{}catch (err){
    //     res.send({
    //         code:'005',
    //         message:`数据库错误${err}`
    //     })
    // }
    try {
        const changedRows = await userManagementDao.deleteUsers(ids)
        if (changedRows !== 0) {
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
                    message: '有用户不存在'
                }
            })
        }
    } catch (err) {
        res.send({
            code: '005',
            message: `数据库错误${err}`
        })
    }

}