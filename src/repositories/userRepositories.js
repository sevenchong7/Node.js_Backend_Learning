const pool = require("../config/db");

const findUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
}

const createUser = async (name, email, password) => {
    const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password]);

    return result.rows[0];
}

const findUserById = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
}

const getAllUsers = async () => {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return result.rows;
}

const updateUser = async (id, name, email) => {
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
    return result.rows[0];
}

const deleteUser = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
}

const updateRefreshToken = async (userId, refreshToken) => {
    await pool.query(
        `
        UPDATE users
        SET refresh_token = $1
        WHERE id = $2;
        `,
        [refreshToken, userId]
    );
};

const getRefreshToken = async (userId) => {
    const result = await pool.query(
        `
        SELECT refresh_token 
        FROM users
        WHERE id = $1;
        `,
        [userId]
    )

    return result.rows[0];
}


const deleteRefreshTokenByUserId = async (userId) => {
    const result = await pool.query(
        `
        UPDATE users
        SET refresh_token = NULL
        WHERE id = $1;
        `,
        [userId]
    )
}

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    updateRefreshToken,
    getRefreshToken,
    deleteRefreshTokenByUserId
};