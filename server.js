require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/centre", require("./routes/centreRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));

// Sample route
app.get("/", (req, res) => {
  res.send("Happy Integration");
});

app.listen(PORT, () => {
  console.log(`Server is running locally on http://localhost:${PORT}`);
});

module.exports.handler = serverless(app);
