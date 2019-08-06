import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addPost} from '../actions/postsAction'

export class AddPost extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        msg: ''
    }
    
    static propTypes = {
        addPost: PropTypes.func.isRequired,
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool.isRequired
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()

        const {user} = this.props

        const newPost = {
            author: user.name,
            author_id: user._id,
            title: this.state.title, 
            body: this.state.body
        }
            
        if(newPost.title === '' || newPost.body === ''){
            return this.setState({msg: 'Please fill in all the fields'})
        }

        this.props.addPost(newPost)

        this.setState({title: '', body: '', author: '', msg: ''})
    }

    render() {
        return (
            <>
                {this.props.isAuthenticated?
                <div className="add-post">
                    <h1>Post your blogs!</h1>
                    <form onSubmit={this.onSubmit}>
                        {this.state.msg !== '' ? <p>{this.state.msg}</p>:null}
                        <input type="text" name="title" value={this.state.title} placeholder="Title..." onChange={this.onChange}/>
                        <textarea rows="5" name="body"  value={this.state.body} placeholder="Body..." onChange={this.onChange}></textarea>
                        <button type="submit">Post</button>
                    </form>
                </div>: null}
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addPost})(AddPost)
