const voteManagementDao = require('../../dao/votemanagementDao');
module.exports = async (req,res) => {
    let result = await voteManagementDao.queryAllVoteThemes();
    try {
        res.send({
            code: '000',
            data: {
                message: '投票主题列表已更新',
                voteThemeList: result
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