const landingSchema = require('../schemas/landingsSchemas.js');


const getAllLandings = async () => {
    try {
        const getAllLandings = await landingSchema.find({}, "-_id");
        return getAllLandings;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Landings out" });
    }
}

const getLandingsMinimumMass = async (minMass) => {
    try {
        const getLandingsMinimumMass = await landingSchema.find({ mass: { $gt: minMass } }, "id mass -_id");
        console.log(typeof minMass);
        return getLandingsMinimumMass;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Landing not found" });
    }
}

const getLandingByMass = async (mass) => {
    try {
        console.log(mass);
        const getLandingByMass = await landingSchema.find({ mass: mass });
        console.log(getLandingByMass);
        return getLandingByMass;
    }

    // li>Nombre: {data.name}</li>
    // <li>ID: {data.id}</li>
    // <li>Clase: {data.recclass}</li>
    // <li>Masa: {data.mass} kg</li>
    // <li>Fecha: {data.year}</li>
    // <li>Latitud: {data.reclat}</li>
    // <li>Longitud: {data.reclong}</li>


    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Landing not found" });
    }
}

const getLandingByClass = async (clas) => {
    try {
        const getLandingByClass = await landingSchema.find({ reclass: clas }, "name class -_id");
        return getLandingByClass;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Landing not found" });
    }
}

const createLanding = async (landing) => {
    try {
        let newLanding = new landingSchema(landing);
        let answer = await newLanding.save()
        console.log(answer);
        return {
            answer: "Landing created",
            landingSchema: answer
        };
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Landing not found" });
    }
}

const editLanding = async (landing) => {
    try {
        const editLanding = {
            "id": landing.id,
            "name": landing.name,
            "nametype": landing.nametype,
            "recclass": landing.recclass,
            "mass": landing.mass,
            "fall": landing.fall,
            "year": landing.year,
            "reclat": landing.reclat,
            "reclong": landing.reclong,
            "geolocation": landing.geolocation
        }
        console.log(editLanding);
        const genuineLanding = await landingSchema.edit({ id: landing.id }, editLanding);
        genuineLanding.overwrite(editLanding);
        console.log("Edited", genuineLanding);
        await genuineLanding.save();
        return {
            answer: "edited",
            landingSchema: genuineLanding
        }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Landing not found" });
    }
}

const deleteLanding = async (landing) => {
    try {
        let answer = await landingSchema.delete({ id: landing.id });
        console.log(answer);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Landing not found" });
    }
}

const landingsModels = {
    getAllLandings,
    getLandingsMinimumMass,
    getLandingByMass,
    getLandingByClass,
    createLanding,
    editLanding,
    deleteLanding
};

module.exports = landingsModels;