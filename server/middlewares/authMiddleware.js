const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function authenticate(req, res, next) {
  // More robust header extraction
  const authHeader = req.header("Authorization");
  // Add this at the TOP of your authMiddleware.js
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("NODE_ENV:", process.env.NODE_ENV);

  // Validate header format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization header missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1].trim();

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Validate decoded token structure
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ message: "Malformed token payload" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);

    // More specific error messages
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";

    res.status(401).json({
      message,
      error: error.message,
    });
  }
}

function authorize(roles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required roles: ${roles.join(", ")}`,
      });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
