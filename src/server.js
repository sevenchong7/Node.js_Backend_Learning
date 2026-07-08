const express = require("express");

const app = express();

const userRoutes = require("./routes/userRoutes");

const authRoutes = require("./routes/authRoutes");

const profileRoutes = require("./routes/profileRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

app.use(express.json());

app.use("/users", userRoutes);

app.use("/auth", authRoutes);

app.use("/profile", profileRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});