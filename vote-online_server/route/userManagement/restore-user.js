const userManagementDao = require('../../dao/userManagementDao')

module.exports = async (req, res) => {
    const {id} = req.query
    try {
        const changedRows = await userManagementDao.restoreUser(id)
        if (changedRows === 1) {
            res.send({
                code: '000',
                data: {
                    message: '恢复成功'
                }
            })
        } else {
            res.send({
                code: '001',
                data: {
                    message: '用户状态正常,无需恢复'
                }
            })
        }
    } catch (err) {
        res.send({
            code: '005',
            data: {
                message: `数据库错误${err}`
            }
        })
    }
}