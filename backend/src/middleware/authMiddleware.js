// backend/src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const raw = req.header("Authorization") || req.header("authorization");
  const token = raw?.startsWith("Bearer ") ? raw.replace("Bearer ", "") : raw;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded; // { id, email, role }
    return next();
  } catch (err) {
    console.error("Auth token error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// middleware factory to require a role (e.g. 'admin')
const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (req.user.role !== role) {
    return res.status(403).json({ message: "Forbidden: insufficient role" });
  }
  next();
};
const verifyAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    req.user = decoded;
    next();
  });
};


module.exports = { verifyToken, requireRole };
