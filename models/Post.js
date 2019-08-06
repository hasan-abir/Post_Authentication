const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    author_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('post', PostSchema)