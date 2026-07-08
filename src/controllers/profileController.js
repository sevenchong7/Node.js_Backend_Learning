const pool = require("../config/db");

const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [userId]);

        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

module.exports = {
    getProfile,
};