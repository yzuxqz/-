import {ADD_VOTE_EXTRA_INFO, ADD_VOTE_OPTION, ADD_VOTE_THEME, CHANGE_CURRENT_INDEX, SUBMIT_VOTE} from "../constant";
import {addVoteTheme,addVoteOption,addVoteExtraInfo} from '../../../network/voteManagement/voteManagement'
const INIT_STATE={
    voteTheme:{},
    voteOption:[],
    voteExtraInfo:[],
    current:0
}

export default function voteReducer(preState=INIT_STATE,{type,payload}){
    switch (type){
        case CHANGE_CURRENT_INDEX:
            return {...preState,current:payload.current}
        case ADD_VOTE_THEME:
            return {...preState,voteTheme: payload.voteThemeData}
        case ADD_VOTE_OPTION:
            return {...preState,voteOption: payload.voteOptionsData}
        case ADD_VOTE_EXTRA_INFO:
            return {...preState,voteExtraInfo: payload.voteExtraInfoData}
        case SUBMIT_VOTE:
            addVoteTheme(preState.voteTheme).then(res=>{
                if(res&&res.code==='000'){
                    preState.voteOption.forEach(item=>{
                        let formdata= new FormData()
                        formdata.append('content',item.content)
                        formdata.append('img',item.img?item.img:'')
                        formdata.append('vote_theme_id',res.data.id)
                        addVoteOption(formdata)
                    })
                    preState.voteExtraInfo.forEach(item=>{
                        addVoteExtraInfo({...item,vote_theme_id:res.data.id})
                    })
                }
            })
            return {
                voteTheme:{},
                voteOption:[],
                voteExtraInfo:[],
                current:0
            }

        default:
            return preState
    }
}