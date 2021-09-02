const userManagementDao = require('../../dao/userManagementDao')
module.exports = async (req, res) => {
    const {currentPage, pageSize} = req.query
    try {
        const count = await userManagementDao.queryUsersCount()
        const users = await userManagementDao.queryUsers(currentPage, pageSize)
        if (users[0] === undefined) {
            res.send({
                    code: '001',
                    data: {
                        message: '无用户数据'
                    }
                }
            )
        }
        res.send({
            code: '000',
            data: {
                message: '用户列表已更新',
                count,
                users
            }
        })
    } catch (err) {
        res.send({
            code: '005',
            message: `数据库错误${err}`
        })
    }

}