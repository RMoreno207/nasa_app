const express = require('express');
const neasControllers = require("../controllers/neasControllers");
const neasRouter = express.Router();

//GET -------------------------------------------------------------------
// para obtener la designación y el período anual en base a la clase orbital 
// del asteroide (con query params)​
// Ejemplo: /astronomy/neas?class=aten​
neasRouter.get('/:class', neasControllers.getNeasByClass);

// para obtener designación, fecha y período anual de todos los asteroides que 
// cumplan el filtro de fechas dadas​
// /astronomy/neas?from=2010&to=2015
// /astronomy/neas?from=2010
// /astronomy/neas?to=2015
// En este caso, además, podremos poner la fecha más específica si quisiéramos:
// YYYY-MM-DD
// YYYY-MM
// YYYY
// El endpoint debe ser compatible con los 3 casos
neasRouter.get('/:from', neasControllers.getNeasByYear);
//----------------------------------------------------------------------------

//POST -----------------------------------------------------------------------
// Para crear un nuevo NEA en el sistema. El objeto a crear tendrá los mismos 
// campos como los documentos proporcionandos en MongoDB 
neasRouter.post('/create', neasControllers.createNea);
//----------------------------------------------------------------------------

//PUT -----------------------------------------------------------------------
// Para editar un NEA en el sistema. Búsqueda para editar por designation. El 
// objeto a editar tendrá los mismos campos como los documentos proporcionandos en MongoDB
neasRouter.put('/edit/:id', neasControllers.editNea);
//----------------------------------------------------------------------------

//DELETE -----------------------------------------------------------------------
// Para borrar un NEA del sistema. Búsqueda para borrar por designation.
neasRouter.delete('/delete/:id', neasControllers.deleteNea);
//----------------------------------------------------------------------------

module.exports = neasRouter;