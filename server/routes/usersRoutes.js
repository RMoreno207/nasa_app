const express = require('express');
const usersControllers = require("../controllers/usersControllers");
const usersRouter = express.Router();


//GET -------------------------------------------------------------------
// para obtener todos los usuarios​
usersRouter.get('/?', usersControllers.getAllUsers);

// para obtener usuario por email​
usersRouter.get('/:email', usersControllers.getUser);
//----------------------------------------------------------------------------

//POST -----------------------------------------------------------------------
// Para crear un nuevo usuario en el sistema. El objeto a crear tendrá los 
// mismos campos como los documentos proporcionandos en MongoDB 
usersRouter.post('/create', usersControllers.createUser);
//----------------------------------------------------------------------------

//PUT -----------------------------------------------------------------------
// Para editar un usuario en el sistema. Búsqueda para editar por email. 
// El objeto a editar tendrá los mismos campos como los documentos proporcionandos 
// en MongoDB
usersRouter.put('/edit/:id', usersControllers.editUser);
//----------------------------------------------------------------------------

//DELETE -----------------------------------------------------------------------
// Para borrar un usuario del sistema. Búsqueda para borrar por email.
usersRouter.delete('/delete/:id', usersControllers.deleteUser);
//----------------------------------------------------------------------------

module.exports = usersRouter;