const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new Schema({
    message: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    date: {
        type: Date,
        default: Date.now()
    },
});

let conversationSchema = new Schema({
    message: [messageSchema],
});


module.exports = mongoose.model('conversation', conversationSchema);