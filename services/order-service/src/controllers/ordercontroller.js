import prisma from "../utils/db.js";
import logger from "../utils/logger.js";
import { sendToQueue } from "../messaging/producer.js";

export const createOrder = async (req, res) => {
  try {
    const { customerId, totalAmount } = req.body;

    if (!customerId || !totalAmount) {
      logger.warn("Missing order fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ 1. Save to DB
    const order = await prisma.order.create({
      data: {
        customerId,
        totalAmount,
        status: "PENDING"
      }
    });

    // ✅ 2. Send event to RabbitMQ
    await sendToQueue({
      event: "ORDER_CREATED",
      data: order
    });

    logger.info(`Order created: ${order.id}`);

    res.status(201).json(order);

  } catch (error) {
    logger.error(`Order creation failed: ${error.message}`);
    res.status(500).json({ error: "Failed to create order" });
  }
};