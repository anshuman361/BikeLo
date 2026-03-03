import jwt from "jsonwebtoken";
import User from "../model/User.js";
import asyncHandler from "express-async-handler";
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", req.headers.authorization);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "mySuperSecret123");
    const user = await User.findById(decoded.id).select("-password");
    console.log("Authorization Header:", req.headers.authorization);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Admin access only");
  }
};
