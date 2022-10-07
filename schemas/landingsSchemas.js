const mongoose = require('mongoose');

const newLandingSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    id: {
        type: Number,
        unique: true
    },
    nametype: {
        type: String,
    },
    recclass: {
        type: String,
    },
    mass: {
        type: Number,
    },
    fall: {
        type: String,
    },
    year: {
        type: String,
    },
    reclat: {
        type: Number,
    },
    reclong: {
        type: Number,
    },
    geolocation: {
        latitude: {
            type: String,
        },
        longitude: {
            type: String,
        }
    }
});

const landingSchema = mongoose.model('landings', newLandingSchema);

module.exports = landingSchema;