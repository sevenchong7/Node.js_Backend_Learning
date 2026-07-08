const pool = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
const profileService = require("../services/profileService");

const getProfile = asyncHandler(async (req, res) => {

    const userId = req.user.userId;

    const result = await profileService.getProfile(userId);

    return res.status(200).json({
        user: result
    });

});

module.exports = {
    getProfile,
};