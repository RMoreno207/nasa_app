const express = require('express');
const landingsControllers = require("../controllers/landingsControllers");
const landingsRouter = express.Router();


landingsRouter.get('/', landingsControllers.getAllLandings);
landingsRouter.get('/mass/:mass', landingsControllers.getLandingByMass);// Ejemplo: /astronomy/landings/mass/200000​
landingsRouter.get('/class/:class', landingsControllers.getLandingByClass);// Ejemplo: /astronomy/landings/class/L6​
landingsRouter.post('/create', landingsControllers.createLanding);
landingsRouter.put('/edit/:id', landingsControllers.editLanding);
landingsRouter.delete('/delete/:id', landingsControllers.deleteLanding);


module.exports = landingsRouter;