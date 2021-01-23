const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const db = require('../model/db')
const bodyparser = require('body-parser')
const {checktoken} = require('../controller/auth')




const authController = require('../controller/user')

//const authProfileController = require('../controller/auth')
const isLoggedIn = require('../controller/auth')
const router = express.Router()

router.use(bodyparser.json())
router.use(bodyparser.urlencoded({extended:false}))

router.get('/getusers',checktoken,authController.getusers)
router.get('/getuser/:id',authController.getuser)
router.post('/add',authController.adduser)
router.put('/edit/:id',authController.updateuser)
router.delete('/delete/:id',authController.deleteuser)
router.post('/login',authController.login)

//router.get('/profile',isLoggedIn,(req,res)=>{
  //  console.log('inside')
    // console.log(req.user)
//})


module.exports = router