import { INIT_USER_INFO } from "../constant"

export default function userInfoAction(dispatch){
    let actions={
        init:(user)=>{
            dispatch({type:INIT_USER_INFO,payload:{user}})
        }
    }
    
    return {actions}
}