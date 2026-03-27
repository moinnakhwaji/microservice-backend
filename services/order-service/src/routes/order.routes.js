import express from 'express';

const router = express.Router();

// Create a new order
import { createOrder } from '../controllers/ordercontroller.js';
router.post('/orders', createOrder);


export default router;