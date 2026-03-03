import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Bike",
    },
    startTime: {
      type: Date,
      require: true,
    },
    endTime: {
      type: Date,
      require: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
