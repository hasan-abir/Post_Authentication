import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomeRoute from './components/main/HomeRoute'
import PostRoute from './components/main/PostRoute'
import AppBar from './components/AppBar'
import {Provider} from 'react-redux'
import {store} from './store'
import {loadUser} from './actions/authAction'
import './App.scss'

class App extends Component{
    componentDidMount() {
        store.dispatch(loadUser())
    }
    
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <AppBar />
                        <Switch>
                            <Route path="/" component={HomeRoute} exact />
                            <Route path="/posts" component={PostRoute} exact />
                        </Switch>       
                </Router>
            </Provider>
        )
    }
}

export default App;
