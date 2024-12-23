const Feedback = require("../models/Feedback");
const Centre = require("../models/Centre");

exports.addFeedback = async (req, res) => {
  try {
    const { id } = req.params; // Centre ID
    const { name, feedback } = req.body;

    const centre = await Centre.findById(id);
    if (!centre) {
      return res.status(404).json({ error: "Centre not found." });
    }

    const newFeedback = new Feedback({
      centreId: id,
      name,
      feedback,
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully!",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Could not submit feedback." });
  }
};
