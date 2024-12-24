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

    let centre = await Centre.findOne({ userId });

    if (centre) {
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

    // Find the centre and populate the associated user to get the email
    const centre = await Centre.findOne({ userId }).populate({
      path: "userId",
      select: "email",
    });

    if (!centre) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const response = {
      ...centre.toObject(),
      email: centre.userId.email, // Add the email explicitly
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.checkProfileCompletion = async (req, res) => {
  try {
    const userId = req.userId;
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
