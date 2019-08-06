const express = require('express');
const router = express.Router();
const db = require('../models/db');
const conversationModel = require('../models/message');

router.get('/', (req, res) => {
    //renvoie les données pour afficher les utilisateur au front.
})

// router.get('/:id', (req, res) => {
//     //renvoie les données pour afficher les messages de l'utilisateur select au front.
// })

router.post('/conversation-add', (req, res) => {

})

router.post('/:id/message-add', (req, res) => {

})

router.get('/delete-conversation/:id', (req, res) => {
    //delete la conversation select. 
})

module.exports = router;