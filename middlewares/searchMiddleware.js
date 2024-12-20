const jwt = require("jsonwebtoken");

function verifyTokenOptional(req, res, next) {
  const token = req.header("Authorization");

  if (token && token.startsWith("Bearer ")) {
    const authToken = token.split(" ")[1];
    try {
      const decoded = jwt.verify(authToken, "your_secret_key");
      req.user = { userId: decoded.userId, isAdmin: decoded.isAdmin };
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  next();
}

module.exports = verifyTokenOptional;
