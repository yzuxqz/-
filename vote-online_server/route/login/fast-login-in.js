const loginDao = require('../../dao/loginDao')

module.exports = async (req, res) => {
    const {phone, verifyMessage: message} = req.query
    if (message === req.session.message) {
        try {
            const result = await loginDao.fastLogin(phone)
            const user = result[0]
            if (user !== undefined) {
                //用户信息存入session
                req.session.user = user
                res.send({
                    code: '000',
                    data: {
                        message: `欢迎${user.userName}进入voteOnline`
                    }
                })
            } else {
                res.send({
                    code: '001',
                    data: {
                        message: '该手机号用户不存在,请注册',
                    }
                })
            }
        } catch (err) {
            res.send({
                code: '005',
                data: {
                    message: `数据库错误${err}`,
                }
            })
        }
    }else {
        res.send({
            code: '001',
            data: {
                message: '验证码校验失败'
            }
        })
    }

}