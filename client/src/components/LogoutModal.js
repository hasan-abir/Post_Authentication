import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {logout} from '../actions/authAction'
 
export class LogoutModal extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="log-out">
                <button className="logout-btn" onClick={this.props.logout}>Sign Out</button>
            </div>
        )
    }
}

export default connect(null, {logout})(LogoutModal)

