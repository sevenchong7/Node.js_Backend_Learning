// const users = require("../data/users");
const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/userService");

//GET all users
const getAllUsers = asyncHandler(async (req, res) => {

    const result = await userService.getAllUsers();

    return res.status(200).json(result);
});

//GET single user by ID
const getUserById = asyncHandler(async (req, res) => {

    const id = Number(req.params.id);

    const result = await userService.getUserById(id);

    return res.status(200).json(result);

});

//CREATE user
const createUser = asyncHandler(async (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;


    const result = await userService.createUser({
        name,
        email,
        password
    });

    return res.status(200).json(result);

});

//UPDATE user
const updateUser = asyncHandler(async (req, res) => {

    const id = Number(req.params.id);

    const {
        name,
        email
    } = req.body;

    const result = await userService.updateUser({
        id,
        name,
        email
    })

    return res.status(200).json(result);
});

//DELETE user
const deleteUser = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const result = await userService.deleteUser(id);

    return res.status(200).json(result);
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};