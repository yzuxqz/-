const voteManagementDao=require('../../dao/votemanagementDao')
const ipDao=require('../../dao/ipDao')
module.exports=async (req, res) => {
    const {category, title, begin_date, finish_date,ip_limit,vote_num,everyday} = req.body
    try {
        const insertId = await voteManagementDao.addVoteTheme(category, title, begin_date, finish_date,ip_limit,vote_num,everyday)
        res.send({
            code: '000',
            data: {
                message: '添加投票主题成功',
                id: insertId
            }
        })
    } catch (err) {
        res.send({
            code: '005',
            data: {
                message:  `数据库错误${err}`
            }
        })
    }
}