const express = require('express');
const router = express.Router();
const db = require('../models/db');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
/* Search partners */

router.post('/', (req, res) => {
    // console.log('search: ', req.session.user._id);
    // Search les utilisateurs ayant les memes dispos sur le meme sport, mais ne sort pas l'utilisateur courant.
    userModel.findById(req.session.user._id, (err, data) => {
        console.log(data.sport[0].sport);
        userModel.find({ 
            _id: { $ne: req.session.user._id },
            sport: {
                $elemMatch: {
                    sport: data.sport[0].sport,
                    availability: {
                        $elemMatch: {
                            day: data.sport[0].availability[0].day,
                            start: { $lte: data.sport[0].availability[0].stop },
                            stop: { $gte: data.sport[0].availability[0].start }
                        }
                    }
                }
            }
        }, (err, data) => {
                console.log(data);
                res.status(200).send({ users: data });
        })
    })
})

router.post('/home', (req, res) => {
    // console.log('token: ', req.body.token);
    var decoded = jwt.verify(req.body.token, 'SECRET_KEY');
    // console.log('JWT decoded: ', decoded);
    // console.log('Enter path Search for the Home Page');
    // req.session.id = req.sessionID;
    // console.log('session', req.session);
    // console.log('search: ', req.session.user);
    // Search les utilisateurs ayant les memes dispos sur le meme sport, mais ne sort pas l'utilisateur courant.
    userModel.findById(decoded.user._id, (err, data) => {
        console.log('Data Sport: ', data.sport);
        if ( data.sport.length > 0) {
            userModel.find({ 
                _id: { $ne: decoded.user._id },
                sport: {
                    $elemMatch: {
                        sport: data.sport[0].sport,
                        availability: {
                            $elemMatch: {
                                day: data.sport[0].availability[0].day,
                                start: { $lte: data.sport[0].availability[0].stop },
                                stop: { $gte: data.sport[0].availability[0].start }
                            }
                        }
                    }
                }
            }, (err, data) => {
                console.log(data);
                res.status(200).send({ users: data });
            })
        }
        else
            res.status(200).send({ users: null });

    })
})

module.exports = router;

// userModel.findOne({
//     sports: {$elemMatch: {name: 'toto'}}
// })