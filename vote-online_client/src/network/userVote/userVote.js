import {request} from '../request'

export function addCollect(userId,voteThemeId){
    return request({
        method:'get',
        url:'/userVote/addCollect',
        params:{
            userId,
            voteThemeId
        }
    })
}
export function isCollect(userId,voteThemeId){
    return request({
        method:'get',
        url:'/userVote/isCollect',
        params:{
            userId,
            voteThemeId
        }
    })
}
export function changeAddCollect(userId,voteThemeId){
    return request({
        method:'get',
        url:'/userVote/changeAddCollect',
        params:{
            userId,
            voteThemeId
        }
    })
}
export function delCollect(userId,voteThemeId){
    return request({
        method:'get',
        url:'/userVote/delCollect',
        params:{
            userId,
            voteThemeId
        }
    })
}
export function queryIsCollect(userId,voteThemeId){
    return request({
        method:'get',
        url:'/userVote/queryIsCollect',
        params:{
            userId,
            voteThemeId
        }
    })
}

export function getHasVoteNum(userId,voteThemeId){
    return request({
        method:'get',
        url:'/userVote/getHasVoteNum',
        params:{
            userId,
            voteThemeId
        }
    })
}

export function addIp(data){
    return request({
        method:'post',
        url:'/userVote/addIp',
        data
    })
}
export function addNoIp(data){
    return request({
        method:'post',
        url:'/userVote/addNoIp',
        data
    })
}