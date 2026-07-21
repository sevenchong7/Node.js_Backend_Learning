const redisClient = require("../config/redis");

const MAX_ATTEMPTS = 5;
const WINDOW_SECONDS = 60;

const loginRateLimit = async (req, res, next) => {

    const ip = req.ip;

    const key = `login:${ip}`;

    // Increase the counter
    const attempts = await redisClient.incr(key);

    // First request → set expiry
    if (attempts === 1) {
        await redisClient.expire(key, WINDOW_SECONDS);
    }

    // Too many attempts
    if (attempts > MAX_ATTEMPTS) {
        return res.status(429).json({
            message: "Too many login attempts. Please try again later."
        });
    }

    next();
};

module.exports = loginRateLimit;