const express = require("express");

const router = express.Router();

const loginRateLimit = require("../middleware/rateLimitMiddleware");

const {
    loginUser,
    registerUser
} = require("../controllers/authController");

// POST login user
router.post("/login", loginRateLimit, loginUser);

// POST register user
router.post("/register", registerUser);

module.exports = router;