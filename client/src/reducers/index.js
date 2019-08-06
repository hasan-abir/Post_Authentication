import {combineReducers} from 'redux'
import postsReducer from './postsReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
 
export default combineReducers({
    posts: postsReducer,
    auth: authReducer,
    error: errorReducer
})