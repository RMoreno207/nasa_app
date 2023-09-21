const mongoose = require("../utils/dbMongo");

const newLandingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: String,
    unique: true,
  },
  nametype: {
    type: String,
  },
  recclass: {
    type: String,
  },
  mass: {
    type: String,
  },
  fall: {
    type: String,
  },
  year: {
    type: String,
  },
  reclat: {
    type: String,
  },
  reclong: {
    type: String,
  },
  geolocation: {
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
  },
});

const landingSchema = mongoose.model("landings", newLandingSchema);

module.exports = landingSchema;
