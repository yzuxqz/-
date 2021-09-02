const express = require('express')
const voteManagement = express.Router()

/**
 * 增加投票主题
 */
voteManagement.post('/addVoteTheme', require('./voteManagement/add-vote-theme'))

/**
 * 增加投票选项
 */
voteManagement.post('/addVoteOption', require('./voteManagement/add-vote-option'))

/**
 *增加额外需要的信息
 */
voteManagement.post('/addExtraInfo',require('./voteManagement/add-extra-info'))
/**
 * 查询所有投票主题
 */
voteManagement.get('/queryAllVoteThemes',require('./voteManagement/query-all-vote-themes'))
/**
 * 分页查询投票主题列表
 */
voteManagement.get('/queryVoteThemes',require('./voteManagement/query-vote-themes'))
/**
 * 查询投票主题总数
 */
voteManagement.get('/queryVoteThemesCount',require('./voteManagement/query-vote-theme-count'))
/**
 * 删除单个投票主题
 */
voteManagement.get('/deleteVoteTheme',require('./voteManagement/delete-vote-theme'))
/**
 * 查询投票选项
 */
voteManagement.get('/queryVoteOptions',require('./voteManagement/query-vote-options'))
/**
 * 查询额外信息采集表
 */
voteManagement.get('/queryVoteExtraInfo',require('./voteManagement/query-vote-extra-info'))
module.exports = voteManagement
// /** 
//  * 分页查询投票主题列表
//  */
// voteManagement.get('/queryVoteThemes',async (req,res)=>{
//     const {pageSize,currentPage} = req.query
//     try{
//         const result = await queryVoteThemes(pageSize,currentPage)
//         res.send({
//             code:'000',
//             data:{
//                 message:'投票列表已更新',
//                 votes:result
//             }
//         })
//     }catch (err) {
//         res.send({
//             code:'001',
//             data:{
//                 message:'数据库错误',
//                 err
//             }
//         })
//     }
// })
//
// voteManagement.get('/queryVoteCategories',async (req,res)=>{
//     const result = await queryVoteCategories()
//     (result)
// })
