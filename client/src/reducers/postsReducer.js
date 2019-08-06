import {GET_POSTS, ADD_POST, REMOVE_POST, POSTS_LOADING} from '../actions/types'

const initialState = {
    posts: [],
    loading: true
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case ADD_POST:
            return{
                ...state,
                posts: [action.payload, ...state.posts]
            }   
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => {
                    return action.payload !== post._id
                })
            } 
        case POSTS_LOADING:
            return {
                ...state,
                loading: false
            }        
        default: 
            return state    
    }
}