const userSchema = require('../schemas/usersSchemas');

const getAllUsers = async () => {
    try {
        const getAllUsers = await userSchema.find({}, "-_id");
        return getAllUsers;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "User not found" });
    }
}

const getUser = async (email) => {
    try {
        const getUser = await userSchema.find({ email: email }, "-_id");
        return getUser;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "User not found" });
    }
}

const createUser = async (user) => {
    try {
        let newUser = new userSchema(user);
        console.log(newUser);
        let answer = await newUser.save();
        console.log(answer);
        return {
            answer: "User created",
            userSchema: answer
        };
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "User not found" });
    }
}

const editUser = async (user) => {
    try {
        const editUser = {
            "name": user.name,
            "nickname": user.nickname,
            "email": user.email,
            "picture": user.picture,
            "affiliatedNumber": user.affiliatedNumber,
            "affiliationDate": user.affiliationDate,
            "occupation": user.occupation,
            "birthdate": user.birthdate,
            "neas_discovered": user.neas_discovered
        }
        console.log(editUser);
        const genuineUser = await userSchema.edit({ email: user.email }, editUser);
        genuineUser.overwrite(editUser);
        console.log("Edited", genuineUser);
        await genuineUser.save();
        return {
            answer: "edited",
            userSchema: genuineUser
        }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "User not found" });
    }
}

const deleteUser = async (user) => {
    try {
        let answer = await userSchema.remove({ email: user.email });
        console.log(answer);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "User not found" });
    }
}

const usersModels = {
    getAllUsers,
    getUser,
    createUser,
    editUser,
    deleteUser
};

module.exports = usersModels;