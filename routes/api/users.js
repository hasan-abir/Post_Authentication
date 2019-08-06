const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../../models/User')

router.post('/', (req, res) => {
    const {name, email, password} = req.body

    if(name === '' || email === '' || password === '') return res.status(400).json({msg: 'Please enter all fields'})

    User.findOne({email}).then(user => { 
        if(user) return res.status(400).json({msg: 'User already exists'}) 

        const newUser = new User({
            name,
            email,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err
                newUser.password = hash

                newUser.save().then(user => 

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
                                }
                            })
                        }
                    )                
                )
            })
        })
    })
})

module.exports = router


