const landingsModel = require('../models/landingsModels');

//GET -----------------------------------------------------------------------
const getAllLandings = async (req, res) => {
    try {
        const landings = await landingsModel.getAllLandings();
        // console.log(landings);
        res.status(200).json(landings);
        console.log(landings.length);
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "landing not found" });
    }
}


const getLanding = async (req, res) => {
    //Guardamos los parametros req 
    //para obtener nombre y masa de todos aquellos meteoritos cuya masa sea igual o superior a una masa (gr) dada (con query parameters)​
    // Ejemplo: /astronomy/landings?minimum_mass=200000​
    // let minimumMass = req.query.minimumMass;
    // let minMass = parseInt(minimumMass);
    let minMass = parseInt(req.query.minimumMass);

    if (minMass) {// /landings?minimum_mass=200000
        try {
            let landingMinimumMass = await landingsModel.getLandingsMinimumMass(minMass);
            res.status(200).json(landingMinimumMass);
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({ "message": "landing not found" });
        }
    } else {// /landings
        const landings = await landingsModel.getLandingByMass(mass);
        console.log(landings);
        res.status(200).json(landings);
    }
};

const getLandingByMass = async (req, res) => {
    try {
        let paramsInt = parseInt(req.params.mass);
        console.log("holi", paramsInt);

        let landingByMass = await landingsModel.getLandingByMass(paramsInt);
        res.status(200).json(landingByMass);
        console.log(landingByMass);
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
    getAllLandings,
    getLanding,
    getLandingByMass,
    getLandingByClass,
    createLanding,
    editLanding,
    deleteLanding
};