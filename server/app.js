const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//Middleware 404
// const manage404 = require('./middlewares/error404');
// app.use(manage404);

//Router
const landingsRouter = require("./routes/landingsRoutes");
const neasRouter = require("./routes/neasRoutes");
const usersRouter = require("./routes/usersRoutes");

var corsOptions = {
  origin: ["https://nasa-app-one.vercel.app", "http://localhost:3000"],
  credentials: true,
};

//Read body request
app.use(cors(corsOptions));
app.use(express.json()); // Para habilitar recepción de datos JSON en una request
app.use(express.urlencoded({ extended: true }));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//Rutas
app.use("/api/astronomy/landings", landingsRouter);
app.use("/api/astronomy/neas", neasRouter);
app.use("/api/users", usersRouter);
const loggerFormat =
  ":method :url :status :response-time ms - :res[content-length]";
app.use(
  morgan(loggerFormat, {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  })
);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
