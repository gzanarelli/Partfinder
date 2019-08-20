const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
    let data = req.body.data;
    // Search les utilisateurs ayant les memes dispos sur le meme sport, mais ne sort pas l'utilisateur courant.
    userModel.find({ 
        _id: { $ne: decoded.user._id },
        sport: {
            $elemMatch: {
                sport: data.sport,
                availability: {
                    $elemMatch: {
                        day: data.day,
                        start: { $lte: data.stop },
                        stop: { $gte: data.start }
                    }
                }
            }
        }
    }, (err, data) => {
            res.status(200).send({ users: data });
    })
})

router.post('/home', (req, res) => {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
 
    // Search les utilisateurs ayant les memes dispos sur le meme sport, mais ne sort pas l'utilisateur courant.
    userModel.findById(decoded.user._id, (err, data) => {
        if ( data.sport.length > 0) {
            // let sportList = []
            // for(let i = 0; i < data.sport.length; i++) {
            //     sportList[i] = data.sport[i].sport;
            // }
            // console.log('Liste des sport: ', sportList);

            userModel.find({ 
                _id: { $ne: decoded.user._id },
                sport: {
                    $elemMatch: {
                        sport: data.sport[0].sport,
                        availability: {
                            $elemMatch: {
                                day: data.sport[0].availability[0].day,
                                // start: { $lte: data.sport[0].availability[0].stop },
                                stop: { $gte: data.sport[0].availability[0].start }
                            }
                        }
                    }
                }
            }, (err, data) => {
                res.status(200).send({ users: data });
            })
        }
        else
            res.status(200).send({ users: null });
    })
})

module.exports = router;
