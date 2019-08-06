const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const router = express.Router()

const User = require('../../models/User')

router.post('/', (req, res) => {
    const {email, password} = req.body

    if(email === '' || password === '') return res.status(400).json({msg: 'Please enter all fields'})

    User.findOne({email}).then(user => { 
        if(!user) return res.status(400).json({msg: 'User does not exist'}) 

        const newUser = new User({
            email,
            password
        })

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'})

                jwt.sign(
                    {id: user._id},
                    process.env.JWT_SECRET,
                    {expiresIn: 3600},
                    (err, token) => {
                        if(err) throw err

                        res.json({
                            token,
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email
                            },
                            msg: 'Logged in!'
                        })
                    }
                )  
            })
    })
})

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router


