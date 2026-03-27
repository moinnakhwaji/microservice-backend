import amqp from "amqplib";
import logger from "../utils/logger.js";

let channel = null;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");

    channel = await connection.createChannel();

    logger.info("✅ RabbitMQ Connected");

  } catch (error) {
    logger.error("❌ RabbitMQ Connection Error:", error);
    process.exit(1); 
  }
};

export const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ not connected");
  }
  return channel;
};
