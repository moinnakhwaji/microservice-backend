import { createUser, register,login,getUser } from "../controllers/user.controllers.js";

import express from "express";

const router = express.Router();

router.post("/", createUser);
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);


export default router;