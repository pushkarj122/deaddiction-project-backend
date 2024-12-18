const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  centreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Centre",
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
