const loginDao = require('../../dao/loginDao')

module.exports = async (req, res) => {
    let result
    const {account, password, role} = req.body
    try {
        if (role === '0') {
            //普通用户登录
            result = await loginDao.userPwdLogin(account, password)
        } else {
            //管理员登录
            result = await loginDao.adminLogin(account, password)
        }
        const user = result[0]
        if (user !== undefined) {
            //用户信息存入session
            // {
            //     id: 54,
            //         phone: '13665202960',
            //     email: '1336352883@qq.com',
            //     password: '666666',
            //     userName: 'yzuxqz',
            //     age: 4,
            //     sex: '男',
            //     ip: 'localhost',
            //     exist: '1'
            // }
            req.session.user = user
            res.send({
                code: '000',
                data: {
                    user,
                    message: `欢迎${user.userName ? user.userName : '管理大大'}进入voteOnline`,
                }
            }) 
        } else {
            res.send({
                code: '001',
                data: {
                    message: '用户名或密码错误',
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