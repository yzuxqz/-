const formidable = require('formidable')
const path = require('path')

const voteManagementDao=require('../../dao/votemanagementDao')

module.exports=(req, res) => {
    const form = formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'voteOptionImgs')
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        let path=''
        if(files.img){
            path = files.img.path.split('public')[1]
        }
        try {
            const insertId = await voteManagementDao.addVoteOption(fields.content, path, fields.vote_theme_id)
            res.send({
                code: '000',
                data: {
                    message: '添加投票选项成功',
                    id: insertId
                }
            })
        } catch (err) {
            res.send({
                code: '005',
                data: {
                    message: `数据库错误${err}`
                }
            })
        }
    })
}
