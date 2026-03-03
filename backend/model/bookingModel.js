import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Bike",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "completed"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentId: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
