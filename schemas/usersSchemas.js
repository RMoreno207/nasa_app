const mongoose = require('mongoose');

const newUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
    },
    email: {
        type: String,
    },
    picture: {
        type: String,
    },
    affiliatedNumber: {
        type: Number,
    },
    affiliationDate: {
        type: Date,
    },
    occupation: {
        type: String,
    },
    birthdate: {
        type: Date,
    },
    neas_discovered: [{
        type: String,
    }]
});

const userSchema = mongoose.model('users', newUserSchema);

module.exports = userSchema;