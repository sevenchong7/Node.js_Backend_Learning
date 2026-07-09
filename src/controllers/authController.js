const userRepositories = require("../repositories/userRepositories");
const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");
const loginSchema = require("../validations/loginValidation");

const loginUser = asyncHandler(async (req, res) => {

    loginSchema.parse(req.body);

    const {
        email,
        password
    } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json(result);
});

const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    const result = await authService.register({
        name,
        email,
        password
    });

    return res.status(201).json(result);
});

module.exports = {
    loginUser,
    registerUser
};