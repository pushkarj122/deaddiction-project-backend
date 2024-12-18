const Centre = require("../models/Centre");

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      name,
      state,
      city,
      location,
      phone,
      pin,
      facilityType,
      profilePhotoURL,
      specialization,
      treatmentApproaches,
      treatmentPrograms,
      numberOfBeds,
      numberOfStaff,
      operatingHours,
      description,
      ownershipType,
    } = req.body;

    // Check if the profile already exists
    let centre = await Centre.findOne({ userId });

    if (centre) {
      // Update existing profile
      centre = await Centre.findOneAndUpdate(
        { userId },
        {
          name,
          state,
          city,
          location,
          phone,
          pin,
          facilityType,
          profilePhotoURL,
          specialization,
          treatmentApproaches: treatmentApproaches
            .replace(/\s/g, "")
            .split(","),
          treatmentPrograms: treatmentPrograms.replace(/\s/g, "").split(","),
          numberOfBeds,
          numberOfStaff,
          operatingHours,
          description,
          ownershipType,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Profile updated successfully", centre });
    }

    // Create a new profile
    centre = new Centre({
      userId,
      name,
      state,
      city,
      location,
      phone,
      pin,
      facilityType,
      profilePhotoURL,
      specialization,
      treatmentApproaches: treatmentApproaches.split(","),
      treatmentPrograms: treatmentPrograms.split(","),
      numberOfBeds,
      numberOfStaff,
      operatingHours,
      description,
      ownershipType,
    });
    await centre.save();

    res.status(201).json({ message: "Profile created successfully", centre });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const centre = await Centre.findOne({ userId });

    if (!centre) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ centre });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.checkProfileCompletion = async (req, res) => {
  try {
    const userId = req.userId; // Retrieved from the token
    const centre = await Centre.findOne({ userId });

    if (centre) {
      return res.status(200).json({ profileCompleted: true });
    }
    res.status(200).json({ profileCompleted: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
