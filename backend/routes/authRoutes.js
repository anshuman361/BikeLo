import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getProfile,
  sendOTP,
  verifyOTP,
} from "../controllers/authController.js";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/send-otp", sendOTP);

export default router;
