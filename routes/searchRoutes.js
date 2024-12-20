const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
const verifyTokenOptional = require("../middlewares/searchMiddleware");

router.get("/", searchController.searchCentres); // For search
router.get("/:id", verifyTokenOptional, searchController.getCentreDetails); // For fetching center profile

module.exports = router;
