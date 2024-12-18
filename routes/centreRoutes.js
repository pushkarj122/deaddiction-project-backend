const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const centreController = require("../controllers/centreController");
const patientController = require("../controllers/patientController");

//Profile routes
router.post("/profile", verifyToken, centreController.createOrUpdateProfile);
router.get("/profile", verifyToken, centreController.getProfile);
router.get(
  "/profile-completion",
  verifyToken,
  centreController.checkProfileCompletion
);

//patient routes
router.post("/patients", verifyToken, patientController.addPatient);
router.get("/patients", verifyToken, patientController.getAllPatients);
router.get("/patients/:id", verifyToken, patientController.getPatientById);
router.delete("/patients/:id", verifyToken, patientController.deletePatient);

module.exports = router;
