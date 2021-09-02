const registerDao = require('../../dao/registerDao')

module.exports = async (req, res) => {
    const {phone, email, password, userName, age, sex, verifyMessage: message} = req.body
    //获取ip(localhost获取不到)
    const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/) ? req.ip.match(/\d+\.\d+\.\d+\.\d+/) : 'localhost'
    if (message === req.session.message) {
        try {
            //判断该用户是否存在
            const isExist = await registerDao.isUserExist(phone)
            if (isExist) {
                res.send({
                    code: '001',
                    data: {
                        message: '手机号已被注册，请直接登录'
                    }
                })
            } else {
                //添加用户
                let id = await registerDao.addUser(phone, email, password, userName, age, sex, ip)
                res.send({
                    code: "000",
                    data: {
                        message: '注册成功',
                        id
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
    } else {
        res.send({
            code: '001',
            data: {
                message: `验证码校验失败`
            }
        })
    }
    //清空验证码
    req.session.message = null
}