const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./../models/user');
const { mongoose } = require('./../db/config');
var app = express();


app.get('/', (req, res) => res.status(200).send({ message: 'welcome to user controller' }))

app.post('/register', (req, res) => {
    let data = req.body;
    let user = new User({
        firstname: data._firstname,
        lastname: data._lastname,
        phone: data._phone,
        email: data._email,
        password: bcrypt.hashSync(data._password, 10)
    })
    user.save().then((userFromdb) => {
        console.log(userFromdb);
        res.status(200).send({ message: "utilisateur enregistré avec succes" })
    }).catch((error) => {
        res.status(400).send(error)
    })

})
app.post('/login', (req, res) => {
    let data = req.body;
    let email = data._email;
    let password = data._password;
    User.findOne({ email }).then((userFromdb) => {
        if (!userFromdb) { res.status(400).send({ "message": "email incorrect" }) }
        else {
            let compare = bcrypt.compareSync(password, userFromdb.password)
            if (!compare) { res.status(400).send({ "message": "password incorrect" }) }
            else {let token = jwt.sign({ idUser: userFromdb._id },'My secret Key')
            res.status(200).send({ token })
        }}
        }).catch((error) => {
            console.log(error);
        })

})
module.exports = app 