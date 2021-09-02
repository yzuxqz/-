import {request} from '../request'

/**
 * 分页获取用户列表
 */
export function getUsers(currentPage,pageSize){
    return request({
        method:'get',
        url:'/userManagement/queryUsers',
        params:{
            currentPage,
            pageSize
        }
    })
}

/**
 * 删除单个用户
 */
export function deleteUser(id){
    return request({
        method:'get',
        url:'/userManagement/deleteUser',
        params:{
            id
        }
    })
}

/**
 * 批量删除用户
 */
export function deleteUsers(ids){
    return request({
        method:'get',
        url:'/userManagement/deleteUsers',
        params:{
            ids
        }
    })
}

export function restoreUser(id){
    return request({
        method:'get',
        url:'/userManagement/restoreUser',
        params:{
            id
        }
    })
}