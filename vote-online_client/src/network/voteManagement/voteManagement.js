import {request} from '../request'

export function addVote(voteData){
    return request({
        method:'post',
        url:'/voteManagement/addVote',
        data:voteData
    })
}

export function addVoteTheme(voteThemeData){
    return request({
        method:'post',
        url:'/voteManagement/addVoteTheme',
        data:voteThemeData
    })
}

export function addVoteOption(voteOptionData){
    return request({
        method:'post',
        url:'/voteManagement/addVoteOption',
        header:{
            "Content-Type":"multipart/form-data"
        },
        data:voteOptionData
    })
}

export function addVoteExtraInfo(voteExtraInfoData){
    return request({
        method:'post',
        url:'/voteManagement/addExtraInfo',
        data:voteExtraInfoData
    })
}
export function queryAllVoteThemes(){
    return request({
        method:'get',
        url:'/voteManagement/queryAllVoteThemes'
    })
}
export function queryVoteThemes(category,currentPage,pageSize){
    return request({
        method:'get',
        url:'/voteManagement/queryVoteThemes',
        params:{
            category,
            currentPage,
            pageSize
        }
    })
}

export function queryVoteThemeCount(category){
    return request({
        method:'get',
        url:'/voteManagement/queryVoteThemesCount',
        params:{
            category
        }
    })
}

export function deleteVoteTheme(id){
    return request({
        method:'get',
        url:'/voteManagement/deleteVoteTheme',
        params:{
            id
        }
    })
}
export function queryVoteOptions(id){
    return request({
        method:'get',
        url:'/voteManagement/queryVoteOptions',
        params:{
            id
        }
    })
}
export function queryVoteExtraInfo(id){
    return request({
        method:'get',
        url:'/voteManagement/queryVoteExtraInfo',
        params:{
            id
        }
    })
}