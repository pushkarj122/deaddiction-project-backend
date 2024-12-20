const Centre = require("../models/Centre");
const Patient = require("../models/Patient");
const Event = require("../models/Event");

exports.searchCentres = async (req, res) => {
  try {
    const {
      name,
      state,
      city,
      specialization,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (name) query.name = { $regex: name, $options: "i" }; // Case-insensitive
    if (state) query.state = { $regex: state, $options: "i" };
    if (city) query.city = { $regex: city, $options: "i" };
    if (specialization)
      query.specialization = { $in: specialization.split(",") };

    const centres = await Centre.find(query, {
      name: 1,
      state: 1,
      city: 1,
      profilePhotoURL: 1,
      specialization: 1,
    }) // Fetch only basic details
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCentres = await Centre.countDocuments(query);

    res.status(200).json({
      message: "Search results",
      data: centres,
      totalPages: Math.ceil(totalCentres / limit),
      currentPage: parseInt(page),
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
