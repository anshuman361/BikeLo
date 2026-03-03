import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  createBooking,
  getAllBookings,
  getBookingByBike,
  getBookingById,
  getMyBookings,
  getRevenue,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/bike/:id", protect, admin, getBookingByBike);
router.get("/", protect, admin, getAllBookings);
router.get("/revenue", protect, admin, getRevenue);
router.get("/:id", protect, getBookingById);
export default router;
