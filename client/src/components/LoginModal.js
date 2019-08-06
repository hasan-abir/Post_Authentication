import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {login} from '../actions/authAction'
import {clearErrors} from '../actions/errorAction'

class LoginModal extends Component {
    state = {
        isOpen: false,
        email: '',
        password: '',
        msg: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate (prevProps) {
        const {error, isAuthenticated} = this.props
        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){
                this.setState({
                    msg: error.msg.msg
                })
            } else{
                this.setState({
                    msg: null
                })
            }
        }

        if(this.state.isOpen){
            if(isAuthenticated){
                this.toggle()
            }
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()

        const {email, password} = this.state

        const user = {
            email,
            password
        }

        this.props.login(user)
    }

    toggle = () => {
        this.props.clearErrors()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
 
    render() {
        return (
            <div className="log-in">
                <button className="login-btn" onClick={this.toggle}>Sign In</button>
                <div className={this.state.isOpen? 'login-modal show' : 'login-modal'}>
                    <div className="modal-content">
                        <button className="close" onClick={this.toggle}>&times;</button>
                        {this.state.msg ? <h3>{this.state.msg}</h3>:null}
                        <h1>Sign In</h1>
                        <form onSubmit={this.onSubmit}>
                            <label htmlFor="login-email">Email</label>
                            <input placeholder="Your Email.." type="email" name="email" id="login-email" onChange={this.onChange}/>
                            <label htmlFor="login-password">Password</label>
                            <input placeholder="Your Password.." type="password" name="password" id="login-password" onChange={this.onChange}/>
                            <button type="submit">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {login, clearErrors})(LoginModal)
