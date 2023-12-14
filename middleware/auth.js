import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const buyerOnly = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  if (user.userType === "buyer") {
    next();
  } else {
    return res.status(403).json({ message: "Access forbidden for sellers" });
  }
};

export const sellerOnly = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  if (user.userType === "seller") {
    next();
  } else {
    return res.status(403).json({ message: "Access forbidden for buyers" });
  }
};
