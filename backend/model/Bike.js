import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Bike", bikeSchema);
