const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepositories = require("../repositories/userRepositories");
const AppError = require("../utils/AppError");

const saltRounds = 10;

const login = async (email, password) => {

    const user = await userRepositories.findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 400);
    }

    const token = jwt.sign({
        userId: user.id,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    const response = {
        message: "Login successful",
        token: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    return response;

};

const register = async ({
    name,
    email,
    password
}) => {
    const existingUser = await userRepositories.findUserByEmail(email);

    if (existingUser) {
        throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userRepositories.createUser(name, email, hashedPassword);

    return {
        message: "Registration successful",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    }
}

module.exports = {
    login,
    register
};