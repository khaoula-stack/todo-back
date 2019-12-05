const express = require('express');
const bcrypt=require('bcrypt');
const {User}=require('./../models/user');
const {mongoose}=require('./../db/config');
var app = express();


app.get('/',(req,res)=>res.status(200).send({message:'welcome to user controller'}))

app.post('/register',(req,res)=>{
    let data =req.body;
    let user= new User ({
        firstname:data._firstname,
        lastname:data._lastname,
        phone:data._phone,
        email:data._email,
        password:bcrypt.hashSync(data._password,10)
    })
    user.save().then((userFromdb)=>{
       console.log(userFromdb);
       res.status(200).send({message: "utilisateur enregistré avec succes"})   
    }).catch((error)=>{
        res.status(400).send(error)
    })
    
    

})
app.post('/login',(req,res)=>{
    res.status(200).send({message:'login works'})

})
module.exports=app 