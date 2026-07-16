const userRepositories = require("../repositories/userRepositories");
const AppError = require("../utils/AppError");

const getProfile = async (userId) => {

    const result = await userRepositories.findUserById(userId);

    if (!result) {
        throw new AppError("User not found", 404);
    }

    return result;
}

module.exports = {
    getProfile
};