import voteReducer from "../pages/AddVote/reducer/vote-reducer";
import userInfoReducer from "../components/PrivateRouter/reducer/user-info-rerducer"
import {combineReducers} from 'redux'
const allReducers=combineReducers({
    voteReducer,
    userInfoReducer
})

export default allReducers