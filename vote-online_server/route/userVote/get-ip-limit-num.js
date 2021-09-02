const userVoteDao = require('../../dao/userVoteDao');
const ipDao =require('../../dao/ipDao')
module.exports = async (req, res) => {
    //获取ip(localhost获取不到)
    const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/) ? req.ip.match(/\d+\.\d+\.\d+\.\d+/) : 'localhost'

    try {
   let res =  ipDao.queryIpLimitVoteNum(ip)
        res.send({
            code: '000',
            data: {
                // lastNum,
            }
        });
    } catch (e) {
        res.send({
            code: '005',
            data: {
                message: `数据库错误${e}`
            }
        });
    }
};