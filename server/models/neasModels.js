const neaSchema = require('../schemas/neasSchemas');

const getNeasByClass = async (clas) => {
    try {
        const getNeasByClass = await neaSchema.find({ orbit_class: clas }, "designation period_yr -_id");
        return getNeasByClass;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "neas not found" });
    }
}

const getNeasByYear = async (year) => {
    try {
        const getNeasByYear = await neaSchema.find({ year: { $gt: year } });
        return getNeasByYear;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "neas not found" });
    }
}

const createNea = async (nea) => {
    try {
        let newNea = new neaSchema(nea);
        let answer = await newNea.save()
        console.log(answer);
        return {
            answer: "neas created",
            neaSchema: answer
        };
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "neas not found" });
    }
}

const editNea = async (nea) => {
    try {
        const editNea = {
            "designation": nea.designation,
            "discovery_date": nea.discovery_date,
            "h_mag": nea.h_mag,
            "moid_au": nea.moid_au,
            "q_au_1": nea.q_au_1,
            "q_au_2": nea.q_au_2,
            "period_yr": nea.reclat,
            "i_deg": nea.i_deg,
            "pha": nea.pha,
            "orbit_class": nea.orbit_class
        }
        console.log(editNea);
        const genuineNea = await neaSchema.edit({ disgnation: neas.designation }, editNea);
        genuineNea.overwrite(editNea);
        console.log("Edited", genuineNea);
        await genuineNea.save();
        return {
            answer: "edited",
            neaSchema: genuineNea
        }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "neas not found" });
    }
}

const deleteNea = async (nea) => {
    try {
        let answer = await neaSchema.delete({ designation: nea.designation });
        console.log(answer);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "neas not found" });
    }
}

const neasModels = {
    getNeasByClass,
    getNeasByYear,
    createNea,
    editNea,
    deleteNea
};

module.exports = neasModels;