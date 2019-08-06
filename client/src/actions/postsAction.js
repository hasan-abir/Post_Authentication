import {GET_POSTS, ADD_POST, REMOVE_POST, POSTS_LOADING} from './types'
import axios from 'axios'
import {tokenConfig} from './authAction'
import {returnErrors} from './errorAction'

export const getPosts = () => dispatch => {
    axios.get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .then(() => dispatch(setPostsLoading()))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addPost = (post) => (dispatch, getState) => {
    axios.post('/api/posts', post, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const removePost = (id) => (dispatch, getState) => {
    axios.delete(`/api/posts/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: REMOVE_POST,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    }
}