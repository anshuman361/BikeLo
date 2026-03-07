import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

//!Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    // if user already registered
    if (user && user.name) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update existing OTP user
    if (user) {
      user.name = name;
      user.password = hashedPassword;
      user.isVerified = true;

      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified: true,
      });
    }

    res.status(201).json({
      message: "User registered successfully",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//!Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //get ip and device
    const ip = req.ip;
    const device = req.headers["user-agent"];

    //store login history
    user.loginHistory.push({
      ip,
      device,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, "mySuperSecret123", {
      expiresIn: "7d",
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "Login success",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
    }

    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(email, otp);

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log("OTP ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;

    await user.save();

    res.json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
