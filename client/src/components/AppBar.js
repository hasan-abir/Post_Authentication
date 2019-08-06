import React, { Component } from 'react'
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import LogoutModal from './LogoutModal'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class AppBar extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const  {isAuthenticated, user} = this.props.auth

        const authLinks = (
            <>
                <div className="welcomeMsg">
                    {user? <p>Welcome, <br/> {user.name}</p>:null}
                </div>
                <LogoutModal />
            </>
        )

        const guestLinks = (
            <>
                <RegisterModal />
                <LoginModal />
            </>
        )
        return (
            <div className="navbar">
                <div className="container">
                    <div className="nav-brand">
                        <a href="/">Paperback Writer</a>
                    </div>
                    <div className="nav-right">
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AppBar)



