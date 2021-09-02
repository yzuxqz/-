const loginDao = require('../../dao/loginDao')

module.exports = async (req, res) => {
    const {phone, message, password} = req.body
    if (message === req.session.message) {
        try {
            const affectedRows = await loginDao.forgetPwd(password, phone)
            if (affectedRows === 1) {
                res.send(
                    {
                        code: '000',
                        data: {
                            message: '密码修改成功'
                        }
                    }
                )
            } else {
                res.send({
                    code: '001',
                    data: {
                        message: '修改密码与原密码重复或不存在该用户'
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
                message: '验证码校验失败'
            }
        })
    }
}