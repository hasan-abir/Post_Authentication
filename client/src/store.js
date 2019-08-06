import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const middleware = [thunk]
export const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))