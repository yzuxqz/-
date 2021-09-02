import {INIT_USER_INFO} from "../constant";

let INIT_STATE = {
    user: {},
};

export default function userInfoReducer(
    preState = INIT_STATE,
    {type, payload}
) {
    switch (type) {
        case INIT_USER_INFO:
            return {...preState,user: payload.user};
        default:
            return preState;
    }
}
