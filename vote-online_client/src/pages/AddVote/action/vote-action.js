import {ADD_VOTE_EXTRA_INFO, ADD_VOTE_OPTION, ADD_VOTE_THEME, CHANGE_CURRENT_INDEX, SUBMIT_VOTE} from "../constant";

export default function voteAction(dispatch){
    let actions={
        changeIndex:(current)=>{
            dispatch({type:CHANGE_CURRENT_INDEX,payload:{current}})
        },
        addVoteThemeAction:(voteThemeData)=>{
            dispatch({type:ADD_VOTE_THEME,payload:{voteThemeData}})
        },
        addVoteOptionAction:(voteOptionsData)=> {
            dispatch({type: ADD_VOTE_OPTION, payload: {voteOptionsData}})
        },
        addVoteExtraInfoAction:(voteExtraInfoData)=>{
          dispatch({type:ADD_VOTE_EXTRA_INFO,payload:{voteExtraInfoData}})
        },
        submitVoteAction:()=>{
            dispatch({type:SUBMIT_VOTE})
        }
    }


    return {actions}
}