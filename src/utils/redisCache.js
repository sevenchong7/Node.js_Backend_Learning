const redisClient = require("../config/redis");

const invalidateTaskCache = async (userId) => {
    let cursor = 0;
    const keys = [];

    do {
        const result = await redisClient.scan(cursor, {
            MATCH: `tasks:${userId}:*`,
            COUNT: 100
        });

        cursor = result.cursor;
        keys.push(...result.keys);

    } while (cursor !== 0);

    if (keys.length) {
        await redisClient.del(keys);
    }
};

module.exports = {
    invalidateTaskCache
};