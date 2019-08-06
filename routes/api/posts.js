const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()

const Post = require('../../models/Post')

router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
})

router.post('/', auth, (req, res) => {
    const {author, author_id, title, body} = req.body

    const newPost = new Post({
        author,
        author_id,
        title,
        body
    })

    newPost.save().then(post => res.json(post))
})

router.delete('/:id', auth, (req, res) => {
    Post.findById(req.params.id)
        .then(post => post.remove().then(() => res.json({msg: 'Post deleted'})))
        .catch(err => res.status(400).json({msg: 'No change to the posts'}))
})

module.exports = router


