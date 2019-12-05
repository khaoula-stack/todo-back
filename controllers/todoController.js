const  express=require('express');
const {Todo}=require('./../models/todo');
var app = express();


app.get('/',(req,res)=>res.status(200).send({message:'welcome to todo controller'}))

app.post('/add',(req,res)=>{
    let data=req.body;
    let todo = new Todo({
        description:data._description,
        idUser:data._idUser,
    
    })
    todo.save().then((todoFromdb)=>{
        console.log(todoFromdb);
        res.status(200).send({"message":"todo ajouté avec succes"})
        
    }).catch((error)=>{
        res.status(400).send(error)
    })
})
module.exports=app
