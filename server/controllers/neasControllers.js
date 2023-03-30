const neasModel = require('../models/neasModels');

//GET -----------------------------------------------------------------------
const getNeasByClass = async (req, res) => {
    //Guardamos los parametros req
    let neasClass = req.query.class;

    if (neasClass) {
        try {
            let neasByClass = await neasModel.getNeasByClass(neasClass);
            res.status(200).json(neasByClass);
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({ "message": "Nea not found" });
        }
    }
}

const getNeasByYear = async (req, res) => {
    let neasYear = req.query.year;

    if (neasYear) {
        try {
            let neasByYear = await neasModel.getNeasByYear(neasYear);
            res.status(200).json(neasByYear);
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({ "message": "Nea not found" });
        }
    }
}
//---------------------------------------------------------------------------

//POST -----------------------------------------------------------------------
const createNea = async (req, res) => {
    try {
        let newNea = await neasModel.createNea(req.body);
        res.status(200).json(newNea);
        console.log("Nea created: ", req.body);
        res.send("Nea created");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "Nea not found" });
    }
}
//---------------------------------------------------------------------------

//PUT -----------------------------------------------------------------------
const editNea = async (req, res) => {
    try {
        await neasModel.editNea(req.body);
        console.log("Nea edited: ", req.body);
        res.send("Nea edited");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "Nea not found" });
    }
}
//---------------------------------------------------------------------------

//DELETE -----------------------------------------------------------------------
const deleteNea = async (req, res) => {
    try {
        await neasModel.deleteNea(req.params.designation);
        console.log("Nea deleted: ", req.params.designation);
        res.send("Nea deleted");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "Nea not found" });
    }
}
//---------------------------------------------------------------------------

const neasControllers = {
    getNeasByClass,
    getNeasByYear,
    createNea,
    editNea,
    deleteNea
}

module.exports = neasControllers;