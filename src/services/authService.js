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

    const accessToken = jwt.sign({
        userId: user.id,
        type: "access"
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    const refreshToken = jwt.sign({
            userId: user.id,
            type: "refresh"
        },
        process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
        }
    );

    await userRepositories.updateRefreshToken(
        user.id,
        refreshToken
    );

    const response = {
        message: "Login successful",
        accessToken,
        refreshToken,
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

const refreshToken = async (refreshToken) => {

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (decoded.type !== "refresh") {
        throw new AppError("Invalid token type", 401);
    }

    const userId = decoded.userId

    const user = await userRepositories.findUserById(userId);

    // const storeRefreshToken = await userRepositories.getRefreshToken(userId);

    if (refreshToken !== storeRefreshToken) {
        throw new AppError("Invalid Token", 401);
    }

    // const compareResult = await bcrypt.compare(refreshToken, storeRefreshToken);

    if (!compareResult) {
        throw new AppError("Invalid Token", 401);
    }

    const accessToken = jwt.sign({
            userId: user.id,
            type: 'access'
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return {
        accessToken
    };
}

const logout = async (refreshToken) => {

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (decoded.type !== "refresh") {
        throw new AppError("Invalid token type", 401);
    }

    const userId = decoded.userId

    const user = await userRepositories.findUserById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return {
        message: "Logout successful"
    }
}


module.exports = {
    login,
    register,
    refreshToken,
    logout
};