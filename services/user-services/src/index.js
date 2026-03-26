import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
dotenv.config();

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/users", userRoutes);

// Routes
app.get("/", (req, res) => {
    res.send("User service is running");
});

app.listen(PORT, () => {
    console.log(`User service running on port ${process.env.PORT}`);
});

