import prisma from "../utils/db.js";
import logger from "../utils/logger.js";
import { sendToQueue } from "../messaging/producer.js";
import axios from "axios";

export const createOrder = async (req, res) => {
  try {
    const { customerId, totalAmount } = req.body;

    if (!customerId || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const amountNum = Number(totalAmount);

    if (isNaN(amountNum)) {
      return res.status(400).json({ error: "Invalid totalAmount" });
    }

    // validate user
    let user;
    try {
      const response = await axios.get(
        `http://localhost:5000/users/${customerId}`, // ✅ string
        { timeout: 3000 }
      );
      user = response.data;
    } catch (err) {
      // logger.error(`User validation failed for customerId: ${customerId}`, err);
      return res.status(503).json({ error: "User service unavailable" });
    }

    // create order
    const order = await prisma.order.create({
      data: {
        customerId: String(customerId), // ✅ FIX
        totalAmount: amountNum,
        status: "PENDING"
      }
    });

    // async event
    sendToQueue({
      event: "ORDER_CREATED",
      data: {
        orderId: order.id,
        customerId: order.customerId,
        totalAmount: order.totalAmount
      }
    }).catch(err => logger.error(err));

    return res.status(201).json({ order });

  } catch (error) {
    console.log(error);
    logger.error(error);
    return res.status(500).json({ error: "Order failed" });
  }
};