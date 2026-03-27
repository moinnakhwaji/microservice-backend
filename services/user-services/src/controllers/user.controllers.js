import prisma from "../utils/db.js";
import logger from "../utils/logger.js";



export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            logger.error("Missing required fields");
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
        logger.info("User created successfully");
        res.status(201).json(user);
    } catch (error) {
        logger.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
}

export const register = async (req, res) => {}
export const login = async (req, res) => {}
export const getUser = async (req, res) => {}
