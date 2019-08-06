import React from 'react'
import {Link} from 'react-router-dom'
import {illustration} from '../SVG.js'

export default function HomeRoute() {
    return (
        <div className="home">
            <div className="header">
                <h1>Paperback writer</h1>
                <h2><span>Sign Up</span> an account <br/>OR<br /> <span>Sign In</span> if you already have one,<br/> to post your favorite blogs!</h2>
                <Link to="/posts">Here's our latest posts</Link>
            </div>
            <div className="svg">
                {illustration}
            </div>
        </div>
    )
}
