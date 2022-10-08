const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to MongoDB established"));

module.exports = mongoose;