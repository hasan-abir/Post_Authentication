import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {register} from '../actions/authAction'
import {clearErrors} from '../actions/errorAction'

class RegisterModal extends Component {
    state = {
        isOpen: false,
        name: '',
        email: '',
        password: '',
        msg: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate (prevProps) {
        const {error, isAuthenticated} = this.props
        if(error !== prevProps.error){ 
            if(error.id === 'REGISTER_FAIL'){
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

        const {name, email, password} = this.state

        const newUser = {
            name,
            email,
            password
        }

        this.props.register(newUser)
    }

    toggle = () => {
        this.props.clearErrors()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div className="register">
                <button className="register-btn" onClick={this.toggle}>Sign Up</button>
                <div className={this.state.isOpen? 'register-modal show' : 'register-modal'}>
                    <div className="modal-content">
                        <button className="close" onClick={this.toggle}>&times;</button>
                        {this.state.msg ? <h3>{this.state.msg}</h3>: null}
                        <h1>Create A New Account</h1>
                        <form onSubmit={this.onSubmit}>
                            <label htmlFor="register-name">Name</label>
                            <input placeholder="Your Name.." type="text" name="name" id="register-name" onChange={this.onChange}/>
                            <label htmlFor="register-email">Email</label>
                            <input placeholder="Your Email.." type="email" name="email" id="register-email" onChange={this.onChange}/>
                            <label htmlFor="register-password">Password</label>
                            <input placeholder="Your Password.." type="password" name="password" id="register-password" onChange={this.onChange}/>
                            <button type="submit">Sign Up</button>
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

export default connect(mapStateToProps, {register, clearErrors})(RegisterModal)
