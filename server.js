require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();

// Connect to database
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/centre", require("./routes/centreRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

// Sample route
app.get("/", (req, res) => {
  res.send("Happy Integration");
});
app.listen(4000, () => {
  console.log(`Server is running on http://localhost:4000`);
});
// Export the serverless handler
module.exports = serverless(app);
