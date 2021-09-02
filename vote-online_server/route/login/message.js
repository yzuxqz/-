const {randomCode, sendCode} = require("../../utils/getMessage")

module.exports = (req, res) => {
    let {phone} = req.query
    //生成6位数字随机验证码
    let code = randomCode(6);
    //发送验证码
    sendCode(phone, code, function (success) {
        if (success) {
            req.session.message = code
            res.send({
                code: '000',
                data: {
                    message: '短信验证码已发送'
                }
            });
        } else {
            res.send({
                code: '001',
                data: {
                    message: '短信验证码发送失败'
                }
            });
        }
    })
}