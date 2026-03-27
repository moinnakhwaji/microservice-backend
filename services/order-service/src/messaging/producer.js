import amqp from 'amqplib'; 
import logger from '../utils/logger.js';

let channel = null;

export const connectRabbitMQ = async (req, res) => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        channel = await connection.createChannel();
        logger.info("Connected to RabbitMQ");
        res.status(200).json({ message: "Connected to RabbitMQ" });
        
    } catch (error) {
        logger.error("Error connecting to RabbitMQ:", error);
        res.status(500).json({ error: "Failed to connect to RabbitMQ" });
    }
}