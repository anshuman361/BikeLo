import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//!Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
