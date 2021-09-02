const voteManagementDao = require('../../dao/votemanagementDao');
module.exports = async (req,res) => {
    const {id} =req.query
    let result = await voteManagementDao.queryVoteExtraInfo(id);
    try {
        res.send({
            code: '000',
            data: {
                message: '额外信息采集表已更新',
                voteExtraInfo: result
            }
        });
    } catch (err) {
        res.send({
            code: '005',
            data: {
                message: `数据库错误${err}`
            }
        });
    }
    res.send();

};