import {request} from '../request'

export function register(data){
    return request({
        method:'post',
        url:'/register/addNormalUser',
        data
    })
}
