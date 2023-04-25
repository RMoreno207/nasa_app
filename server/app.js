const express = require("express");
// const path = require("path");
// const morgan = require("morgan");
const cors = require("cors");
const app = express();

//Configurations
app.set("port", process.env.PORT || 80);
// const port = process.env.PORT || 5000;

//Middlewares
//404
// const manage404 = require("/middlewares/error404.js");
// app.use(manage404);

//Router
const landingsRouter = require("./routes/landingsRoutes");
const neasRouter = require("./routes/neasRoutes");
const usersRouter = require("./routes/usersRoutes");

//Rutes
//API
app.use("/api/astronomy/landings", landingsRouter);
app.use("/api/astronomy/neas", neasRouter);
app.use("/api/users", usersRouter);

// const loggerFormat =
//   ":method :url :status :response-time ms - :res[content-length]";
// app.use(
//   morgan(loggerFormat, {
//     skip: function (req, res) {
//       return res.statusCode < 400;
//     },
//     stream: process.stderr,
//   })
// );

//"/"
app.get("/", (req, res) => {
  res.send("Hola, mundo!");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.send("Ruta no encontrada");
});

//Errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // intercept OPTIONS method
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
});

// var corsOptions = {
//   origin: [
//     "https://nasa-app-front-9lgvhuclp-rmorenodev.vercel.app",
//     "http://localhost:3000",
//   ],
//   credentials: true,
// };

//Read body request
// app.use(cors(corsOptions));
// Configurar cabeceras y cors

app.use(cors());
// app.use(express.json()); // Para habilitar recepción de datos JSON en una request
// app.use(express.urlencoded({ extended: true }));
// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));

//Init server
app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("port")}`);
});
