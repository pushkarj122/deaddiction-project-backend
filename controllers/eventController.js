const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { title, date, details } = req.body;
    const centreId = req.userId; // From token
    const event = new Event({ title, date, details, centreId });
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create event" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const centreId = req.userId;
    const events = await Event.find({ centreId });
    res.status(200).json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const centreId = req.userId;
    const event = await Event.findOneAndDelete({ _id: id, centreId });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete event" });
  }
};
