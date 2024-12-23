const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const centreController = require("../controllers/centreController");
const patientController = require("../controllers/patientController");
const eventController = require("../controllers/eventController");
const feedbackController = require("../controllers/feedbackController");

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
router.delete("/patients/:id", verifyToken, patientController.deletePatient);

// event routes
router.post("/events", verifyToken, eventController.createEvent);
router.get("/events", verifyToken, eventController.getEvents);
router.delete("/events/:id", verifyToken, eventController.deleteEvent);

//feedback routes
router.post("/:id/feedback", feedbackController.addFeedback);

module.exports = router;
