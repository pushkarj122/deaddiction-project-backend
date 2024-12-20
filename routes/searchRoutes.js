const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

router.get("/", searchController.searchCentres); // For search
// router.get("/:id", verifyToken, centreController.getCentreDetails); // For fetching center profile

module.exports = router;
