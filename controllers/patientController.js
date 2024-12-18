const Patient = require("../models/Patient");

// Add a new patient
exports.addPatient = async (req, res) => {
  try {
    const {
      name,
      gender,
      age,
      mobileNumber,
      address,
      admissionDate,
      dischargeDate,
      problem,
      treatmentSummary,
      progressSummary,
    } = req.body;

    const newPatient = new Patient({
      centreId: req.userId, // Assuming `req.userId` contains the authenticated centre's ID
      name,
      gender,
      age,
      mobileNumber,
      address,
      admissionDate,
      dischargeDate,
      problem,
      treatmentSummary,
      progressSummary,
    });

    const savedPatient = await newPatient.save();
    res
      .status(201)
      .json({ message: "Patient added successfully", patient: savedPatient });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add patient", details: error.message });
  }
};

// Get all patients for the authenticated centre
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ centreId: req.userId });
    res.status(200).json({ patients });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve patients", details: error.message });
  }
};

// Get a specific patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findOne({ _id: id, centreId: req.userId });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json({ patient });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve patient", details: error.message });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPatient = await Patient.findOneAndDelete({
      _id: id,
      centreId: req.userId,
    });

    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete patient", details: error.message });
  }
};
