const express = require("express");

const app = express();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/tasks", taskRoutes);

app.use(errorMiddleware);

module.exports = app;