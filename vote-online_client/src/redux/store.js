import {createStore} from 'redux';
import allReducers from "./reducer";
import {composeWithDevTools} from 'redux-devtools-extension';

export default createStore(allReducers, composeWithDevTools());