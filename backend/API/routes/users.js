const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const { ValidLogin, ValidSignup } = require('../Utils/Validator/validConnexion');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


/* POST Création du compte */

router.post('/signup', ValidSignup, (req, res) => {
    userModel.findOne({email: req.body.email}, (err, data) => {
        if (err) console.error(err);
        if (data) res.status(500).send({error: 'Email is already use', result: false});
        else {
            let newUser = new userModel({
                username: req.body.username,
                email: req.body.email.toLowerCase(),
                password: CryptoJS.AES.encrypt(`${req.body.password}`, process.env.ENCRYPT).toString()
            }).save(function(err, data) {
                if (err) console.error(err);
                else
                    res.status(200).send({message: `Account was created successfully`, result: true});
            });
        }
    });
});

/* POST Connexion à un compte */

router.post('/login', ValidLogin, (req, res) => {
    userModel.findOne({ email: req.body.email.toLowerCase() }, (err, data) => {
        if (err) console.log(err);
        if (!data) res.status(400).send({error: 'Account not found', result: false});
        else {
            let passDecrypt = CryptoJS.AES.decrypt(data.password.toString(), process.env.ENCRYPT).toString(CryptoJS.enc.Utf8);
            if (req.body.password === passDecrypt) {
                jwt.sign({user: data}, process.env.SECRET_TOKEN, (err, token) => {
                    if (err) console.error(err);
                    res.status(200).send({message: 'Login successfully', result: true, token: token});
                })
            } else {
                res.status(400).send({error: 'Email and password not match', result: false});                
            }
        }
    });
});


module.exports = router;