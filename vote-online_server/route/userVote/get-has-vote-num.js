const userVoteDao = require('../../dao/userVoteDao');
const ipDao =require('../../dao/ipDao')
module.exports = async (req, res) => {
    const {userId,voteThemeId} = req.query;
    let lastNum
    try {
        const result = await ipDao.queryHasIpTable(userId,voteThemeId)
        if(result[0]){//已经存在对应ip表
             lastNum = result[0].last_num
        }else{
            try{
                const result2 = await userVoteDao.getHasVoteNumFormTheme(voteThemeId)
                lastNum = result2[0].vote_num
            }catch (err){
                console.log(err);
            }
        }
        res.send({
            code: '000',
            data: {
                lastNum,
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