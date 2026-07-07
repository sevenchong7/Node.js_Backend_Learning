const express = require("express");

const router = express.Router();

const {
    loginUser,
    registerUser
} = require("../controllers/authController");

// POST login user
router.post("/login", loginUser);

// POST register user
router.post("/register", registerUser);

module.exports = router;