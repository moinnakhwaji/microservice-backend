import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import morgan from "morgan";
import cors from "cors";
dotenv.config();
import logger from "./utils/logger.js";

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(morgan("combined", {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
}));
app.use(cors());
app.use("/users", userRoutes);

// Routes
app.get("/", (req, res) => {
    res.send("User service is running");
});

app.listen(PORT, () => {
    console.log(`User service running on port ${process.env.PORT}`);
});

