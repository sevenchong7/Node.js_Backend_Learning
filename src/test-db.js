const pool = require("./config/db");

async function testConnection() {
    try {
        const result = await pool.query("SELECT NOW();");

        console.log("Connected!");

        console.log(result.rows);
    } catch (error) {
        console.error(error);
    } finally {
        pool.end();
    }
}

testConnection();