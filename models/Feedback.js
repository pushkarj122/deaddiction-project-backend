const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  centreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Centre",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
