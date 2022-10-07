const express = require('express');
const path = require('path');
require('./utils/dbMongo');
const cors = require('cors');
const app = express();


//Middleware 404
// const manage404 = require('./middlewares/error404');
// app.use(manage404);
const morgan = require('morgan');

//Router
const landingsRouter = require('./routes/landingsRoutes');
const neasRouter = require('./routes/neasRoutes');
const usersRouter = require('./routes/usersRoutes');

//Read body request
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//Rutas
app.use('/api/astronomy/landings', landingsRouter);
app.use('/api/astronomy/neas', neasRouter);
app.use('/api/users', usersRouter);
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);