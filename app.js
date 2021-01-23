
const express = require('express')
const bodyparser = require('body-parser')
const db = require('./model/db')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')


const app = express()

app.use(cookieParser())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

const generateAuthToken = async(req, res)=>{
    const id = result[0].id
    const token = await jwt.sign({id},'mysecretkey')
    return token
}


app.use('/',require('./routes/pages'))
app.listen(8003,()=>{
    console.log('server is running on port 8003')
})

module.exports = generateAuthToken