const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;

// Sample route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
