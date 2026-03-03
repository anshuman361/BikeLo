import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getProfile } from "../controllers/authController.js";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/authController.js";
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

export default router;
