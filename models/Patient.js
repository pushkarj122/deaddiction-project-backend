const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  centreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Centre",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  admissionDate: {
    type: Date,
    required: true,
  },
  dischargeDate: {
    type: Date,
  },
  problem: {
    type: String,
    required: true,
  },
  treatmentSummary: {
    type: String,
  },
  progressSummary: {
    type: String,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
