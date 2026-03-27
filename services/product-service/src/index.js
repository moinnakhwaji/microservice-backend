import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import morgan from "morgan";
import cors from "cors";
import logger from "./utils/logger.js";

dotenv.config();

const stream = {
    write : (message)=>{
        logger.info(message.trim());
    }
}



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  morgan((tokens, req, res) => {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number(tokens.status(req, res)),
      response_time: Number(tokens["response-time"](req, res)),
      content_length: tokens.res(req, res, "content-length"),
    });
  }, { stream })
);
app.use(cors());

app.use("/products", productRoutes);

app.get("/", (req, res) => {
    res.send("product service running ");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});