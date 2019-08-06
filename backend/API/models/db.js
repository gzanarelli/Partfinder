const mongoose = require('mongoose');

module.exports = mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@lacapsule-jnjrz.mongodb.net/spartfinder?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    () => console.log('DB is Up')
);