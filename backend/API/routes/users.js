const express = require('express');
const router = express.Router();
const db = require('../models/db');
const userModel = require('../models/user');
const { validSignup, validLogin } = require('./validator');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


/* POST Création du compte */

router.post('/signup', validSignup, (req, res) => {
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
                else { 
                    req.session.user = data;                
                    res.status(200).send({message: `Account was created successfully`, result: true});
                }
            });
        }
    });
});


router.post('/test', (req, res) => {
    userModel.findOne({email: req.body.email}, (err, data) => {
        if (err) console.error(err);
        if (data) res.status(500).send({error: 'Email is already use', result: false});
        else {
            let sport = {
                sport: req.body.sport,
                availability: {
                    day: req.body.availability.day,
                    start: req.body.availability.start,
                    stop: req.body.availability.stop,
                }
            }
            let newUser = new userModel({
                username: req.body.username,
                email: req.body.email.toLowerCase(),
                password: CryptoJS.AES.encrypt(`${req.body.password}`, process.env.ENCRYPT).toString(),
                city: req.body.city,
                zipcode: req.body.zipcode,
                address: req.body.address,
                gender: req.body.gender,
                sport: sport,
            }).save(function(err, data) {
                if (err) console.error(err);
                else 
                    res.status(200).send({message: `Account was created successfully`, result: true});
            });
        }
    });
});

/* POST Connexion à un compte */

router.post('/login', validLogin, (req, res) => {
    userModel.findOne({ email: req.body.email.toLowerCase() }, (err, data) => {
        if (err) console.log(err);
        // console.log(data);
        if (!data) res.status(400).send({error: 'Account not found', result: false});
        else {
            let passDecrypt = CryptoJS.AES.decrypt(data.password.toString(), process.env.ENCRYPT).toString(CryptoJS.enc.Utf8);
            if (req.body.password === passDecrypt) {
                req.session.user = data;
                jwt.sign({user: data}, 'SECRET_KEY', (err, token) => {
                    if (err) console.error(err);
                    res.status(200).send({message: 'Login successfully', result: true, token: token});
                })
                // console.log('session user', req.session.user);
                // console.log('session', req.session.id);
            } else {
                res.status(400).send({error: 'Email and password not match', result: false});                
            }
        }
    });
});


/* GET Déconnexion du compte en cours */

// router.get('/logout', (req, res) => {
//     console.log('logged out');
// });

module.exports = router;