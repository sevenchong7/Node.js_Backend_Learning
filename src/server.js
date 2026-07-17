const app = require("./app");
const redisClient = require("./config/redis");

const startServer = async () => {
  try {
    await redisClient.connect();

    console.log("✅ Redis Connected");

    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });

  } catch (error) {
    console.error(error);
  }
};

startServer();