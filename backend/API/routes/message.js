const express = require('express');
const router = express.Router();
const db = require('../models/db');
const conversationModel = require('../models/message');
const jwt = require('jsonwebtoken');
// const userModel = require('../models/user');

router.post('/', (req, res) => {

    let decoded = jwt.verify(req.body.token, process.env.SECRET_TOKEN);

    conversationModel.find({ users: decoded.user._id }).populate('users').exec((err, data) => {
        if (err) console.error(err);
        res.status(200).send({data: data, userID: decoded.user._id});
    })
})

router.post('/conversation', (req, res) => {

    let decoded = jwt.verify(req.body.token, process.env.SECRET_TOKEN);

    conversationModel.findOne({ users: { $all: [ decoded.user._id, req.body.partnerID ]}}).populate('users').exec((err, data) => {
        if (err) console.error(err);
        console.log('conversation found: ', data);
        res.status(200).send({data: data, userID: decoded.user._id});
    })
})


router.post('/conversation-add', (req, res) => {

    let decoded = jwt.verify(req.body.token, process.env.SECRET_TOKEN);

    conversationModel.find({users: [decoded.user._id, req.body.partnerID]}, (err, data) => {
        if (Object.keys(data).length > 0) {
            res.status(400).send({errors: {message: 'You already add this partner'}});
        } else {
            let newConversation = new conversationModel({
                users: [decoded.user._id, req.body.partnerID],
                message: []
            }).save((err, data) => {
                res.status(200).send({message: 'You partner has been add', result: true});
            })
        }
    })
})

router.post('/:id/message-add', (req, res) => {

})

router.get('/delete-conversation/:id', (req, res) => {
    //delete la conversation select. 
})

module.exports = router;