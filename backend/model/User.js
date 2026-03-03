import mongoose from "mongoose";

const loginHistorySchema = new mongoose.Schema({
  ip: String,
  device: String,
  loginTime: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    lastActive: Date,
    loginHistory: [loginHistorySchema],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
