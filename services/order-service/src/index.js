import express from "express";
import { connectRabbitMQ } from "./messaging/rabbit.js";
import { createOrder } from "./controllers/ordercontroller.js";

const app = express();
app.use(express.json());
app.post("/orders", createOrder);
await connectRabbitMQ();

app.listen(4000, () => {
  console.log("Server running on port 4000");
});