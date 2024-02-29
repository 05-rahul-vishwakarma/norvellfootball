const jwt = require("jsonwebtoken");

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET; // Replace with your secret key

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { success: true, decoded };
  } catch (error) {
    return { success: false, error: "Invalid token" };
  }
};

module.exports = { generateToken, verifyToken };
