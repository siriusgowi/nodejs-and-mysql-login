const mysql = require('mysql')


const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'loginandsecurity'
})


db.connect((err)=>{
if(err){
    return console.log(err)
}else{
    console.log('MySQL connected...')
}
})

module.exports = db