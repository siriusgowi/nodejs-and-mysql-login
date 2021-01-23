const db = require('../model/db')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const mysql = require('mysql')



// const auth = async (req, res ,next)=>{
//     console.log(req.cookies)
//    //const isdecode = jwt.verify(token,'mysecretkey')

//    if(req.cookies.jwt){
//        try{
//            //verify token
//           const decoded = await promisify (jwt.verify)(
//             req.cookies.jwt,'mysecretkey'
//           )
//           console.log('decoded')
//           console.log(decoded)

//           let sql = 'select * from users where id =?'
//           let query = db.query(sql,[decoded.id],(err,result)=>{
//              console.log(result)
//              if(!result){
//                  return next()
//              }
//              req.user = result[0]
//              console.log('next')
//               return next()
//             })

//        }catch(e){
//          return next()
//        }
//    }else{
//        return next()
//    }
// }

const checktoken = (req, res, next)=>{
let token = req.get('Authorization')
console.log(token)
if(token){
    //remove bearer from string
token = token.slice(7)
jwt.verify(token,'mysecretkey',(err,decoded)=>{
    if(err){
        return res.json({
            success:0,
            message:'Invalid token'
        })
    }else{
        req.decoded = decoded
        next()
    }
})
}else{
    return res.json({
        success:0,
        message:'Access Denied..unauthorized user'
    })
}
}

// const auth = (req, res , next)=>{
//     try{
//         //res.send(req.cookies)
//         const token = req.cookies.jwt
//         const decoded = jwt.verify(token,'mysecretkey')
//         let sql = 'select * from users where id=?'
//         let query = db.query (sql,[decoded.id],(err,result)=>{
//             if(!result){
//                 throw new Error()
//             }
//             req.user = result[0]
//             console.log(req.user)
//             next()
//         })
//     }catch(e){
//         return res.status(401).send('please authenticate')
//     }
// }

module.exports = {
 //   auth,
    checktoken
}