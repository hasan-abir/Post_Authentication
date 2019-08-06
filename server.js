const express = require('express')
const mongoose =  require('mongoose')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGODB_KEY, { useCreateIndex: true, useNewUrlParser: true }).then(() => console.log('MongoDB connected'))

app.use('/api/posts', require('./routes/api/posts'))

app.use('/users/register', require('./routes/api/users'))
app.use('/users/login', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))