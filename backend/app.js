import express from "express";
import dotenv from "dotenv";
dotenv.config();
//dotenv.config({ path: "./.env" });
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import bikeRoutes from "./routes/bikeRoutes.js";
import { notFound } from "./middlewares/errorMiddleware.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(helmet());

app.get("/", (req, res) => {
  console.log("BikeLo api running");
});
app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
