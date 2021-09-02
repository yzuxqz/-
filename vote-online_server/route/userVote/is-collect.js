const userVoteDao = require('../../dao/userVoteDao');
module.exports = async (req, res) => {
    const {userId, voteThemeId} = req.query;
    try {
        const result = await userVoteDao.isCollect(userId, voteThemeId);
        res.send({
            code: '000',
            data: {
                result
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