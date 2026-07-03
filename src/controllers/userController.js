const users = require("../data/users");

//GET all users
const getAllUsers = (req, res) => {
    res.json(users);
}

//GET single user by ID
const getUserById = (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
}

//CREATE user
const createUser = (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
}

//UPDATE user
const updateUser = (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name;

    res.json({
        message: "User updated",
        user: user
    });
}

//DELETE user
const deleteUser = (req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users.splice(userIndex, 1);

    res.json({
        message: "User deleted"
    });
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};