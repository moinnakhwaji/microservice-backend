import prisma from "../utils/db.js";
import logger from "../utils/logger.js";
import bcrypt from "bcryptjs";





export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            logger.error("Missing required fields");
            return res.status(400).json({ error: "Missing required fields" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        logger.info("User created successfully");
        res.status(201).json(user);
    } catch (error) {
        logger.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      logger.warn("Register failed - missing fields");
      return res.status(400).json({ error: "All fields required" });
    }

    // 🔥 check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      logger.warn(`User already exists: ${email}`);
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    logger.info(`User registered: ${user.id}`);

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    logger.error(`Register error: ${error.message}`);
    res.status(500).json({ error: "Register failed" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      logger.warn("Login failed - missing fields");
      return res.status(400).json({ error: "Email & password required" });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      logger.warn(`Login failed - user not found: ${email}`);
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.warn(`Invalid password attempt: ${email}`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    logger.info(`User logged in: ${user.id}`);

    res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ error: "Login failed" });
  }
};
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      logger.warn(`User not found: ${id}`);
      return res.status(404).json({ error: "User not found" });
    }

    logger.info(`User fetched: ${id}`);

    res.status(200).json(user);

  } catch (error) {
    logger.error(`Get user error: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
