import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/products", productRoutes);

app.get("/", (req, res) => {
    res.send("product service running ");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});