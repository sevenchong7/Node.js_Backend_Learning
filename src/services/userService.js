const userRepositories = require("../repositories/userRepositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const saltRounds = 10;

const getAllUsers = async () => {
    const result = await userRepositories.getAllUsers();
    return result;
}

const getUserById = async (id) => {

    if (isNaN(id)) {
        throw new AppError("Invalid user ID", 400);
    }

    const result = await userRepositories.findUserById(id);

    if (!result) {
        throw new AppError("User not found", 404);
    }

    return result;
}

const createUser = async ({
    name,
    email,
    password
}) => {

    if (!name || !email || !password) {
        throw new AppError("Name, email and password are required", 400);
    }

    const existingUser = await userRepositories.findUserByEmail(email);

    if (existingUser) {
        throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userRepositories.createUser(name, email, hashedPassword);

    return {
        message: "User created",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    }

}

const updateUser = async ({
    id,
    name,
    email
}) => {

    if (isNaN(id)) {
        throw new AppError("Invalid user ID", 400);
    }

    if (!name || !email) {
        throw new AppError("Name and email are required", 400);
    }

    const result = await userRepositories.updateUser(id, name, email);

    if (!result) {
        throw new AppError("User not found", 404);
    }

    return {
        message: "User updated",
        user: {
            id: result.id,
            name: result.name,
            email: result.email
        }
    }
}

const deleteUser = async (id) => {

    if (isNaN(id)) {
        throw new AppError("Invalid user ID", 400);
    }

    const result = userRepositories.deleteUser(id);

    if (!result) {
        throw new AppError("User not found", 404);
    }

    return {
        message: "User deleted",
    }

}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};