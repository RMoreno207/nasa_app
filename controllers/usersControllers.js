const usersModel = require('../models/usersModels');

//GET -----------------------------------------------------------------------
const getAllUsers = async (req, res) => {
    try {
        let users = await usersModel.getAllUsers;
        res.status(200).json(users);
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "User not found" });
    }
}

//By email
const getUser = async (req, res) => {
    let email = req.query.email;
    if (email) {
        try {
            let user = await usersModel.getUser(email);
            res.status(200).json(user);
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({ "message": "User not found" });
        }
    }
}
//---------------------------------------------------------------------------

//POST -----------------------------------------------------------------------
const createUser = async (req, res) => {
    try {
        let newUser = await usersModel.createUser(req.body);
        res.status(200).json(newUser);
        console.log("User created: ", req.body);
        res.send("User created");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "User not found" });
    }
}
//---------------------------------------------------------------------------

//PUT -----------------------------------------------------------------------
const editUser = async (req, res) => {
    try {
        await usersModel.editUser(req.body);
        console.log("User edited: ", req.body);
        res.send("User edited");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "User not found" });
    }
}
//---------------------------------------------------------------------------

//DELETE -----------------------------------------------------------------------
//By email
const deleteUser = async (req, res) => {
    try {
        await usersModel.deleteUser(req.params.email);
        console.log("User deleted: ", req.params.email);
        res.send("User deleted");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "User not found" });
    }
}
//---------------------------------------------------------------------------

const usersControllers = {
    getAllUsers,
    getUser,
    createUser,
    editUser,
    deleteUser
}

module.exports = usersControllers;