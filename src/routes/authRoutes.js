const express = require("express");

const router = express.Router();

const loginRateLimit = require("../middleware/rateLimitMiddleware");

const {
    loginUser,
    registerUser,
    refreshToken,
    logout
} = require("../controllers/authController");

// POST login user
router.post("/login", loginRateLimit, loginUser);

// POST register user
router.post("/register", registerUser);

//POST refresh token 
router.post("/refreshToken", refreshToken);

//POST logout 
router.post("/logout", logout);

module.exports = router;