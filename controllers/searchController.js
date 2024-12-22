const Centre = require("../models/Centre");
const Patient = require("../models/Patient");
const Event = require("../models/Event");
const Feedback = require("../models/Feedback");

exports.searchCentres = async (req, res) => {
  try {
    const { query } = req.query;

    // Check if 'query' is provided
    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query cannot be empty" });
    }

    // Define the search criteria (dynamic search across multiple fields)
    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { state: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
      ],
    };

    // Fetch all the centres based on search query (without pagination)
    const centres = await Centre.find(searchQuery, {
      name: 1,
      state: 1,
      city: 1,
      profilePhotoURL: 1,
      specialization: 1,
    });

    res.status(200).json({
      message: "Search results",
      data: centres,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search centres" });
  }
};

exports.getCentreDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Centre by its ID
    const centre = await Centre.findById(id);

    const feedbacks = await Feedback.find({ centreId: id });

    if (!centre) {
      return res.status(404).json({ error: "Centre not found" });
    }

    // Basic profile data
    const basicDetails = {
      name: centre.name,
      state: centre.state,
      city: centre.city,
      location: centre.location,
      phone: centre.phone,
      pin: centre.pin,
      facilityType: centre.facilityType,
      profilePhotoURL: centre.profilePhotoURL,
      specialization: centre.specialization,
      description: centre.description,
      ownershipType: centre.ownershipType,
      treatmentApproaches: centre.treatmentApproaches,
      treatmentPrograms: centre.treatmentPrograms,
      numberOfBeds: centre.numberofBeds,
      numberOfStaff: centre.numberOfStaff,
      operatingHours: centre.operatingHours,
      feedbacks,
    };

    // If user is not logged in or is not admin, return only basic details
    if (!req.user || !req.user.isAdmin) {
      return res.status(200).json(basicDetails);
    }

    // Use the userId from the Centre to query Patients and Events
    const userId = centre.userId;
    const patients = await Patient.find({ centreId: userId });
    const events = await Event.find({ centreId: userId });

    return res.status(200).json({
      ...basicDetails,
      patients,
      events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
