const express = require('express');
const landingsControllers = require("../controllers/landingsControllers");
const landingsRouter = express.Router();


//GET -------------------------------------------------------------------
//Obtener nombre y masa de todos aquellos meteoritos cuya masa sea igual 
//o superior a una masa (g) dada (con query parameters)
// Ejemplo: /astronomy/landings?minimum_mass=200000​
landingsRouter.get('/', landingsControllers.getLanding);

// para obtener nombre y masa de uno o más meteoritos cuya masa sea la
// especificada (route params)​
// Ejemplo: /astronomy/landings/mass/200000​
landingsRouter.get('/mass/:mass', landingsControllers.getLandingByMass);

// para obtener los nombres y clase de aquellos meteoritos cuya clase sea 
// la registrada (route params)​
// Ejemplo: /astronomy/landings/class/L6​
landingsRouter.get('/class/:class', landingsControllers.getLandingByClass);

// para obtener nombre, masa y fecha de todos los meteoritos caídos en 
// determinadas fechas de la siguiente manera:​
// /astronomy/landings?from=1960&to=1990
// /astronomy/landings?from=1960
// /astronomy/landings?to=1990
// El mismo endpoint deberá ser compatible con las 3 formas
// landingsRouter.get('/year/:year', landingsControllers.getLandingByYear);
//----------------------------------------------------------------------------

//POST -----------------------------------------------------------------------
// Para crear un nuevo landing en el sistema. El objeto a crear tendrá los mismos 
// campos como los documentos proporcionandos en MongoDB
landingsRouter.post('/create', landingsControllers.createLanding);
//----------------------------------------------------------------------------

//PUT -----------------------------------------------------------------------
// Para editar un landing en el sistema. Búsqueda para editar por ID. El objeto a 
// editar tendrá los mismos campos como los documentos proporcionandos en MongoDB
landingsRouter.put('/edit/:id', landingsControllers.editLanding);
//----------------------------------------------------------------------------

//DELETE -----------------------------------------------------------------------
// Para borrar un landing en el sistema. Búsqueda para borrar por ID.
landingsRouter.delete('/delete/:id', landingsControllers.deleteLanding);
//----------------------------------------------------------------------------

module.exports = landingsRouter;