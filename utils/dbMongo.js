const mongoose = require('mongoose');
require('dotenv').config();

let url = "mongodb+srv://rmoreno207:mongopami@cluster0.qal7pse.mongodb.net/test";

// const url =
//     `mongodb+srv://
//     ${process.env.MONGO_USERNAME}:
//     ${process.env.MONGO_PASSWORD}@
//     ${process.env.MONGO_HOSTNAME}:
//     ${process.env.MONGO_PORT}/
//     ${process.env.MONGO_DB}
//     ?authSource=admin`;

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to MongoDB established"));

module.exports = mongoose;