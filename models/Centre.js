const mongoose = require("mongoose");

const centreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  facilityType: {
    type: [String],
    enum: [
      "Residential Facility",
      "Outpatient Clinic",
      "Detoxification Center",
      "Day Program Center",
    ],
  },
  profilePhotoURL: {
    type: String,
  },
  specialization: {
    type: [String],
    enum: [
      "Alcohol Addiction",
      "Drug Addiction",
      "Behavioural Addiction",
      "Mental Health Treatment",
      "Anxiety",
      "Depression",
      "Teen and Adolescent Services",
      "Family Centered Treatments",
      "Gender Specific Programs",
      "Culture Specific Programs",
    ],
  },
  treatmentApproaches: {
    type: [String],
  },
  treatmentPrograms: {
    type: [String],
  },
  numberOfBeds: {
    type: Number,
    required: true,
  },
  numberOfStaff: {
    type: Number,
    required: true,
  },
  operatingHours: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ownershipType: {
    type: [String],
    enum: ["Private", "Government", "Non-profit"],
  },
});

module.exports = mongoose.model("Centre", centreSchema);
