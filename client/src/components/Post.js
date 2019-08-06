import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {removePost} from '../actions/postsAction'
import { connect } from 'react-redux'

export class Post extends Component {
    state = {
        date: null
    }
    
    componentDidMount() {
        this.calculateDate()
    }



    static propTypes = {
        removePost: PropTypes.func.isRequired,
        post: PropTypes.object.isRequired
    }

    delete = (id) => {
        this.props.removePost(id)
    }

    calculateDate = () => {
        const dateCreated = Date.parse(this.props.post.date)

        const diffTime = Math.abs(new Date(Date.now()).getTime() - new Date(dateCreated).getTime());
        const diffSeconds = Math.floor(diffTime / (1000))
        const diffMinutes = Math.floor(diffTime / (1000 * 60))
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 

        switch(true){
            case (diffSeconds <= 1):
                this.setState({date: `A second ago`})
                break
            case (diffMinutes < 1):
                this.setState({date: `${diffSeconds} seconds ago`})
                break
            case (diffMinutes === 1):
                this.setState({date: `A minute ago`})
                break
            case (diffHours < 1):
                this.setState({date: `${diffMinutes} minutes ago`})
                break
            case (diffHours === 1):
                this.setState({date: `An hour ago`})
                break
            case (diffHours < 24 ):
                this.setState({date: `${diffHours} hours ago`})  
                break
            case (diffHours < 48):
                this.setState({date: `A day ago`}) 
                break  
            case (diffHours >= 48):
                this.setState({date: `${diffDays} days ago`}) 
                break        
            default: 
                this.setState({date: this.props.post.date})  
        }
    }

    render() {
        const {post, user} = this.props

        return (
            <div className="post">
                {user? user._id === post.author_id ? <button onClick={() => this.delete(post._id)}>Delete Post</button> : null : null}
                <h1>{post.title}</h1>
                <p>{post.body}</p> 
                <h2>- {post.author}</h2>
                <span>{this.state.date}</span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, {removePost})(Post)
