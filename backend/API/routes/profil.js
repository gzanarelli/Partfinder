const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const ValidProfil = require('../Utils/Validator/ValidProfil');
const ValidSport = require('../Utils/Validator/ValidSport');
const jwt = require('jsonwebtoken');



// Page profil

router.post('/', (req, res) => {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
    userModel.findById(decoded.user._id, (err, data) => {
        if (err) console.error(err);
        res.status(200).send({user: data});
    })
});



// Permet de rajouter un sport avec une dispo.

router.post('/sport-add', ValidSport, (req, res) => {

    let sport = {
        sport: req.body.data.sport,
        availability: {
            day: req.body.data.day,
            start: req.body.data.start,
            stop: req.body.data.stop,
        }
    };
    let decoded = jwt.verify(req.body.token, process.env.SECRET_TOKEN);

    userModel.findById(decoded.user._id, (err, data) => {

        // Check si le sport est déja ajouté dans la DB.
        let add = true;
      
        if (err) console.log(err);
        if (data.sport.length > 0) {
            for(let i = 0; i < data.sport.length; i++) {
                if (data.sport[i].sport.toLowerCase() === sport.sport.toLowerCase()) {
                    add = false;
                    res.status(400).send({ 'errors.message': `You already add ${sport.sport}`});
                }
            }
        }
        if (add === true) {
            userModel.findOneAndUpdate({_id: decoded.user._id}, {$push: {sport}}, {new: true}, (err, data) => {
                if (err) console.log(err);
                console.log(data);
                res.status(200).send({ message: `Add ${sport.sport} with success`});
            })
        }
    })
});



//Ajoute une dispo a un sport existant

router.post('/availability-add', (req, res) => {
    // Recupere l'utilisateur en question
    userModel.findOne({ _id: req.session.user._id }, (err, data) => {
        let avai = false;        
        if (err) console.error(err);

        // Recherche du sport en question
        data.sport.forEach(function(sport) {
 
            // Si le sport est trouvé on add la nouvelle dispo
            if (sport.sport.toLowerCase() == req.body.sport.toLowerCase()) {
                let newAvailability = {
                    day: req.body.availability.day,
                    start: req.body.availability.start,
                    stop: req.body.availability.stop
                };
                sport.availability.push(newAvailability);
                avai = true;
            }
        })
        if (avai === false)
            res.status(400).send(`${req.body.sport} not found`);
        else {
            data.save((err, data) => {
                res.status(200).send({ message: `Availability for ${req.body.sport} has been update` });
            });
        }
    })
});



// Delete une dispo sur un sport ciblé

router.get('/availability-delete/:idSport/:idAvailability', (req, res) => {

    let idSport = req.params.idSport;
    let idAvailability = req.params.idAvailability;

    userModel.findById(req.session.user._id, (err, data) => {
        if (err) console.error(err);
        data.sport[idSport].availability.splice(idAvailability, 1);
        data.save((err, data) => {
            res.status(200).send({ message: `Availability has been delete` });
        });
    })
});



// Delete un sport

router.post('/delete-sport/:idSport', async (req, res) => {

    let decoded = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
    let idSport = req.params.idSport;
    let sportName = '';
    
    await userModel.findById(decoded.user._id, (err, data) => { sportName = data.sport[idSport].sport });
    
    await userModel.findByIdAndUpdate(decoded.user._id, {$pull: {sport: {sport: sportName}}}, { multi: true, useFindAndModify: false, new: true}, (err, data) => {
        if (err) console.log(err);
        console.log(data);
        res.status(200).send({ message: `${sportName} Has been delete` });
    })
});



// Edit le profil

router.post('/edit', ValidProfil, (req, res) => {
    
    let user = { modify: Date.now() };
    if (req.body.picture) user.picture = req.body.picture;
    if (req.body.username) user.username = req.body.username;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.city) user.city = req.body.city;
    if (req.body.address) user.address = req.body.address;
    if (req.body.zipcode && typeof req.body.zipcode === "number") user.zipcode = req.body.zipcode;
    if (req.body.email) user.email = req.body.email;
    user = { $set: user };

    var decoded = jwt.verify(req.body.token, process.env.SECRET_TOKEN);

    userModel.findOneAndUpdate({_id: decoded.user._id}, user, {upsert:true, new: true, useFindAndModify: true}, (err, data) => {
        if (err) console.log(err);
            console.log(data)
        res.status(200).send({message: 'Profil has been modify successfully'});
    })
});

// router.post('/edit/password', validPassword, (req, res) => {
//     userModel.findById(req.session.user._id, (err, data) => {
//         if (err) console.error(err);
//         let passDecrypt = CryptoJS.AES.decrypt(data.password.toString(), process.env.ENCRYPT).toString(CryptoJS.enc.Utf8);        
//         if (passDecrypt !== req.body.oldPassword)
//             res.status(400).send({ oldPassword: 'Old password not match' });
//         passDecrypt = null;
//         let newPassword = CryptoJS.AES.encrypt(`${req.body.password}`, process.env.ENCRYPT).toString();
//         userModel.updateMany({_id: req.session.user._id}, {$set: {password: newPassword, modify: Date.now()}}, (err, data) => {
//             if (err) console.error(err);
//             console.log(data);
//             res.status(200).send({ message: 'Password has been changed' });
//         })
//     })
// });


module.exports = router;