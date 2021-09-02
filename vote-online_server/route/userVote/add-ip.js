const ipDao = require('../../dao/ipDao');
const optionJoinedDao = require('../../dao/optionJoinedDao')
const voteManagementDao = require('../../dao/votemanagementDao')
module.exports = async (req, res) => {

    //获取ip(localhost获取不到)
    const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/) ? req.ip.match(/\d+\.\d+\.\d+\.\d+/) : 'localhost';
    const {vote_theme_id, vote_num,user_id, questionnaire_theme_id, last_num,this_time_used_num,vote_option_id} = req.body;
    try{
        //查该投票该id的所有使用票数，若>该投票的vote_num则限制该ip
        const result = await ipDao.queryIpLimitVoteNum(ip, vote_theme_id);
        if(result[0]){
            let hasUsed=0
            result.forEach(item=>{
                hasUsed += vote_num-item.last_num
            })
            if(Number(hasUsed)+Number(this_time_used_num)>Number(vote_num)){//使用的票数+将要投的票数=每日最高
                if(Number(hasUsed)>=Number(vote_num)){
                    res.send({
                        code:'001',
                        data:{
                            message:`此投票中该ip已达今日最高投票数,您已无法再投票`
                        }
                    })
                }else{
                    res.send({
                        code:'002',
                        data:{
                            message:`此投票中该ip今日最多可再投${vote_num-hasUsed}票`
                        }
                    })
                }
            }else{
                //查找该用户该投票的ip表是否存在
                const result1 = await ipDao.queryIsVoteIpExist(ip, user_id, vote_theme_id);
                //查询该用户该投票选项的参与表是否存在
                const result2 = await optionJoinedDao.queryIsJoined(user_id,vote_option_id)
                if (result1[0]) {//存在
                    await ipDao.upDateIpLastNum(result1[0].id, last_num);
                } else {
                    //不存在就创建
                    await ipDao.addIpLimit(vote_theme_id, last_num, ip, user_id, questionnaire_theme_id);
                }
                if(result2[0]){
                    //更新count
                    let res = await optionJoinedDao.queryCount(user_id,vote_option_id)
                    let oldCount = res[0].count
                    let newCount = Number(oldCount) + Number(this_time_used_num)
                    await optionJoinedDao.updateCount(res[0].id,newCount) //更新joined表
                }else{
                    await optionJoinedDao.firstJoined(user_id,vote_option_id,this_time_used_num)
                }
                //更新vote_option表
                let result3 = await voteManagementDao.queryAllCount(vote_option_id)
                let oldAllCount = Number(result3[0].all_count)
                let newAllCount = oldAllCount + Number(this_time_used_num)
                await voteManagementDao.addAllCount(vote_option_id,newAllCount)
                res.send({
                    code:'000',
                    data:{
                        message:'投票成功'
                    }
                })
            }
        }else{
            //不存在就创建
            await ipDao.addIpLimit(vote_theme_id, last_num, ip, user_id, questionnaire_theme_id);
            res.send({
                code:'000',
                data:{
                    message:'投票成功'
                }
            })
        }
    }catch (e) {
        res.send({
            code:'005',
            data:{
                message:`数据库错误${e}`
            }
        })
    }
};