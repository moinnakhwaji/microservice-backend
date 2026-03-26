import Redis from "ioredis";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
    logger.info("Redis connected");
});

redis.on("error", (error) => {
    logger.error("Redis error", error);
});

export default redis;