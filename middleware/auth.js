const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["token"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    const decoded = jwt.verify(authHeader, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
