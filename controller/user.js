const db = require('../model/db')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const mysql = require('mysql')
//const { auth } = require('./auth')
const generateAuthToken = require('../app')
const { checktoken } = require('./auth')
//get users

exports.getusers = (req, res)=>{
    let sql ='select * from users'
  let query = db.query(sql,(err,results)=>{
if(err) throw err
console.log('Getting all the users in the database')
res.send(results)
})
}

//get users by id

   exports.getuser = (req, res)=>{
    let id = req.params.id
    let sql = 'select * from users where id =?'
    let query = db.query(sql,id,(err,result)=>{
        if(err) throw err
        console.log('getting the user by its id')
    res.send(result)
    })
}

//add user

exports.adduser = async(req, res)=>{
    const data = req.body
    let hashedpassword = await bcrypt.hash(data.password,8)
    const datavalues=[
     data.name,
     data.email,
     hashedpassword
 ]
    let sql ='insert into users (name,email,password) values (?,?,?)'
  let query = db.query(sql,datavalues,(err, result)=>{
      if(err) throw err
      console.log('created new user')
      res.send(result)
  })
 }
 
 //edit or update user

   exports.updateuser = async(req, res)=>{
    let id = req.params.id
    const data = req.body
    const hashedpassword = await bcrypt.hash(data.password,8)
const datavalues=[
        data.name,
        data.email,
       hashedpassword
       //  data.password
    ]
    let sql = `update users set name=?,email=?,password=? where id=${id}`
   let query = db.query(sql,datavalues,(err,result)=>{
       if(err) throw err
       console.log(result)
       res.status(200).send('user updated successfullty...')
   })
}


//delete user by id

exports.deleteuser = (req, res)=>{
    let id = req.params.id
    let sql =`delete from users where id=${id}`
    let query = db.query (sql,id,(err, result)=>{
        if(err) throw err
console.log(result)
res.status(200).send('user deleted successfully...')
    })
}


exports.login= async(req, res)=>{
    const { email , password } = req.body
if(!email || !password){
    return res.status(401).send('please provide an email and password')
}
 let sql = 'select * from users where email=?'
 let query = db.query(sql,[email,password],async(err,result)=>{
    
    console.log(result)
     const isMatch =  await bcrypt.compare(password,result[0].password)
     console.log(isMatch)
     if( !email || !isMatch){
         return res.status(401).send('Email and passwords are incorrect')
      }else
      {
    //const generateAuthToken= async (req, res)=>{
         let id = result[0].id
         console.log(id)
        let token = await jwt.sign ({id},'mysecretkey')
        console.log(token)
        res.status(201).send({token}) 
    //    let id = req.body.id
    //     let sql = 'insert into users (token) values (?)'
    //    let query = db.query(sql,[id,token],(err,result)=>{
    //        if(err) throw err
    //        console.log('token inserted into database')
    //        console.log(result)
    //    })
    //      res.send({
    //         result,token
    //     })
        

    //     const id = result[0].id
    //          const token = jwt.sign({id},'mysecretkey',{
    //              expiresIn:'10 days'
    //          })
            // const cookieOptions = {
            //     expires : new Date(
            //         Date.now +10 * 24 * 60 * 60 * 1000
            //     ),
            //     httpOnly:true
            // }
            //      res.cookie('jwt',token,cookieOptions)
                //  res.status(200).send({
                //      success:1,
                //      message:'login successfully',
                //      token
                //  })
                     }
        
     })
    
 }




































// exports.isLoggedIn = async(req, res,next)=>{
//     console.log('inside')

// console.log(req.cookies)
// if(req.cookies.jwt){
//     try{
//         //verify token 
//         const decoded = await promisify(jwt.verify)(
//           req.cookies.jwt,
//           'mysecretkey'
//         )
//      console.log(decoded)
//      console.log('decoded')

//      //check if the user is still exists
//      let sql = 'select * from users where id =?'
//      let query = db.query(sql,[decoded.id],(err,result)=>{
//        console.log(result)
//        if(!result){
//            return next()
//        }
//        //there is a loggedin user 

//        req.user = result[0]
//        console.log('next')
//        return next()
//      })
 
//     }catch(e){
//          return next()
//     }
// }else{
//     next()
// }
// }