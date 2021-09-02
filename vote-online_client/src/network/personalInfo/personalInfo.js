import {request} from "../request";
export function changePersonalInfo (data){
    return request({
        url:'/personalInfo/updatePersonalInfo',
        method:'post',
        data
    })
}