const landingSchema = require("../schemas/landingsSchemas.js");

const getAllLandings = async () => {
  try {
    const getAllLandings = await landingSchema.find({}, "-_id");
    return getAllLandings;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ message: "Landings out" });
  }
};

const getLandingsMinimumMass = async (minMass) => {
  try {
    const getLandingsMinimumMass = await landingSchema.find(
      { mass: { $gt: minMass } },
      "id mass -_id"
    );
    console.log(typeof minMass);
    return getLandingsMinimumMass;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ message: "Landing not found" });
  }
};

const getLandingById = async (id) => {
  try {
    console.log("getLandingById", id);
    const getLandingById = await landingSchema.find({ id: id });
    console.log(getLandingById);
    return getLandingById;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ message: "Landing not found" });
  }
};

const getLandingByMass = async (mass) => {
  try {
    console.log(mass);
    const getLandingByMass = await landingSchema.find({ mass: mass });
    console.log(getLandingByMass);
    return getLandingByMass;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ message: "Landing not found" });
  }
};

const getLandingByClass = async (byClass) => {
  try {
    const regex = new RegExp(byClass, "i");
    const getLandingByClass = await landingSchema.find({
      recclass: { $regex: regex },
    });
    console.log(getLandingByClass);
    return getLandingByClass;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ message: "Landing not found" });
  }
};

const createLanding = async (landing) => {
  try {
    let newLanding = new landingSchema(landing);
    let answer = await newLanding.save();
    console.log(answer);
    return {
      answer: "Landing created",
      landingSchema: answer,
    };
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ message: "Landing not found" });
  }
};

const editLanding = async (landing) => {
  try {
    const newLanding = landing;
    console.log(newLanding);
    const genuineLanding = await landingSchema.findOneAndUpdate(
      { id: landing.id },
      newLanding
    );
    genuineLanding.overwrite(newLanding);
    await genuineLanding.save();
    return genuineLanding;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ message: "Landing not found" });
  }
};

const deleteLanding = async (id) => {
  try {
    let answer = await landingSchema.deleteOne({ id: id });
    console.log(answer);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ message: "Landing not found" });
  }
};

const landingsModels = {
  getAllLandings,
  getLandingsMinimumMass,
  getLandingById,
  getLandingByMass,
  getLandingByClass,
  createLanding,
  editLanding,
  deleteLanding,
};

module.exports = landingsModels;
