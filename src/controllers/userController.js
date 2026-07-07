// const users = require("../data/users");

const pool = require("../config/db");

//GET all users
const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users ORDER BY id ASC"
        );

        return res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

//GET single user by ID
const getUserById = async (req, res) => {

    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }

}

//CREATE user
const createUser = async (req, res) => {

    try {
        const {
            name,
            email
        } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const user = await pool.query("INSERT INTO users (name, email) VALUES($1, $2) RETURNING * ;", [name, email]);

        return res.status(200).json({
            message: "User created",
            user: user.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

//UPDATE user
const updateUser = async (req, res) => {

    try {
        const id = Number(req.params.id);

        const {
            name,
            email
        } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }


        const result = await pool.query(
            `
            UPDATE users
            SET name = $1,
            email = $2
            WHERE id = $3
            RETURNING *;
            `,
            [name, email, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const updatedUser = result.rows[0];

        return res.status(200).json({
            message: "User updated",
            user: updatedUser
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }

}

//DELETE user
const deleteUser = async (req, res) => {
    try {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *;", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const deletedUser = result.rows[0];

        return res.status(200).json({
            message: "User deleted",
            user: deletedUser
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};