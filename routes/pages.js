const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../model/db')
const router = express.Router()
const bodyparser = require('body-parser')

router.use(bodyparser.json())
router.get('/getusers',(req, res)=>{

     let sql ='select * from users'
   let query = db.query(sql,(err,results)=>{
if(err) throw err
console.log('Getting all the users in the database')
res.send(results)
})
})

router.get('/getuser/:id',(req, res)=>{

    let id = req.params.id
    let sql = 'select * from users where id =?'
    let query = db.query(sql,id,(err,result)=>{
        if(err) throw err
        console.log('getting the user by its id')
    res.send(result)
    })
})

router.post('/add',async(req, res)=>{
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
})


router.put('/edit/:id',async(req, res)=>{

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
           res.status(200).send('updated user')
       })

})

router.delete('/delete/:id',(req, res)=>{
    let id = req.params.id
    let sql =`delete from users where id=${id}`
    let query = db.query (sql,id,(err, result)=>{
        if(err) throw err
console.log(result)
res.status(200).send('user deleted successfully...')
    })
})



module.exports = router