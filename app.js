const express = require('express')

const bodyparser = require('body-parser')
const db = require('./model/db')


const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))


app.use('/',require('./routes/pages'))
app.listen(8003,()=>{
    console.log('server is running on port 8003')
})