import React, { Component } from 'react'
import Post from './Post'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getPosts, removePost} from '../actions/postsAction'


export class PostList extends Component {
    static propTypes = {
        getPosts: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired
    }

    componentDidMount() {
        this.props.getPosts()
    }
    
    render() {
        const {posts} = this.props

        const postsList = posts.map(post => {
            return (<Post key={post._id} post={post}/>)
            })
        return (
            <div className="post-list">
                {this.props.loading? <div className="loader"><img src="spinner/spinner.svg" alt=""/></div> : postsList}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts.posts,
    loading: state.posts.loading
})


export default connect(mapStateToProps, {getPosts, removePost})(PostList)
