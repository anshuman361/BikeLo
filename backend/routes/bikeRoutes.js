import express from "express";
import {
  addBike,
  deleteBike,
  getBikeById,
  getBikes,
  updateBike,
  createBike,
} from "../controllers/bikeController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// router.post("/", protect, admin, addBike);
router.get("/", getBikes);
//router.get("/near", getBikesNearMe);
router.get("/:id", getBikeById);
router.put("/:id", protect, admin, updateBike);
router.delete("/:id", protect, admin, deleteBike);
router.post("/", protect, admin, upload.single("image"), createBike);

export default router;
