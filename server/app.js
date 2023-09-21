//Import required modules
const express = require("express");
const cors = require("cors");
const app = express();

//Configuration
app.set("port", process.env.PORT || 80);
// app.set("port", process.env.PORT || 80);
// const port = process.env.PORT || 5000;

// CORS middleware
app.use(
  cors({
    origin: ["https://nasa-app-front-9lgvhuclp-rmorenodev.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

//Routers
const landingsRouter = require("./routes/landingsRoutes");
// const neasRouter = require("./routes/neasRoutes");
// const usersRouter = require("./routes/usersRoutes");

//Rutes
//API
app.use("/api/astronomy/landings", landingsRouter);
// app.use("/api/astronomy/neas", neasRouter);
// app.use("/api/users", usersRouter);

//Root route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Catch-all route for 404 errors
app.get("*", (req, res) => {
  res.send("Sorry! page not found");
});

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

//Init server
app.listen(app.get("port"), () => {
  console.log(`Running in port ${app.get("port")}`);
});
