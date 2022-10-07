const landingsModel = require('../models/landingsModels');

//GET -----------------------------------------------------------------------
const getLanding = async (req, res) => {
    //Guardamos los parametros req
    let minimumMass = req.query.minimumMass;
    let minMass = parseInt(minimumMass);

    if (minMass) {
        try {
            let landingMinimumMass = await landingsModel.getLandingsMinimumMass(minMass);
            res.status(200).json(landingMinimumMass);
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({ "message": "landing not found" });
        }
    } else {
        const landings = await landingsModel.getAllLandings();
        console.log(landings);
        res.status(200).json(landings);
    }
}

const getLandingByMass = async (req, res) => {
    try {
        let landingByMass = await landingsModel.getLandingByMass(req.params.mass);
        res.status(200).json(landingByMass);
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "landing not found" });
    }
}

const getLandingByClass = async (req, res) => {
    try {
        let landingByClass = await landingsModel.getLandingByClass(req.params.class);
        res.status(200).json(landingByClass);
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "landing not found" });
    }
}
//---------------------------------------------------------------------------

//POST -----------------------------------------------------------------------
const createLanding = async (req, res) => {
    try {
        let newLanding = await landingsModel.createLanding(req.body);
        res.status(200).json(newLanding);
        console.log("Landing created: ", req.body);
        res.send("Landing created");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "landing not found" });
    }
}
//---------------------------------------------------------------------------

//PUT -----------------------------------------------------------------------
const editLanding = async (req, res) => {
    try {
        await landingsModel.editLanding(req.body);
        console.log("Landing edited: ", req.body);
        res.send("Landing edited");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "landing not found" });
    }
}
//---------------------------------------------------------------------------

//DELETE -----------------------------------------------------------------------
const deleteLanding = async (req, res) => {
    try {
        await landingsModel.deleteLanding(req.params.id);
        console.log("Landing deleted: ", req.params.id);
        res.send("Landing deleted");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "landing not found" });
    }
}
//---------------------------------------------------------------------------

module.exports = {
    getLanding,
    getLandingByMass,
    getLandingByClass,
    createLanding,
    editLanding,
    deleteLanding
};