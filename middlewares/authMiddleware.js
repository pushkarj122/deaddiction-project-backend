const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // Get the Authorization header
  const token = req.header("Authorization");

  // If no token is provided, return an error
  if (!token) return res.status(401).json({ error: "Access denied" });

  // Check if the token starts with 'Bearer '
  if (!token.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Token format is invalid" });
  }

  // Extract the token without 'Bearer ' prefix
  const authToken = token.split(" ")[1];

  try {
    // Verify the token

    const decoded = jwt.verify(authToken, process.env.SECRET_KEY);

    req.userId = decoded.userId; // Attach userId to the request
    next(); // Pass to the next middleware
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
