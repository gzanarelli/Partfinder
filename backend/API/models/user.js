const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let timeSchema = new Schema({
    day: String,
    start: Number,
    stop: Number
});

let availabilitySchema = new Schema({
    sport: String,
    availability: [timeSchema],
    niveau: String
});

let userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    sport: [availabilitySchema],
    picture: {
        type: String
    },
    gender: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String,
    },
    zipcode: {
        type: Number
    },
    create:{
        type: Date,
        default: Date.now
    },
    modify:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('users', userSchema);