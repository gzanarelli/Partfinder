const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const CryptoJS = require('crypto-js');

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