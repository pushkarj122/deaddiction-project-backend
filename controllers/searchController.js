const Centre = require("../models/Centre");
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
