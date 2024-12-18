const Event = require("../models/Event");

// Create a new event
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

// Get all events for the authenticated centre
exports.getEvents = async (req, res) => {
  try {
    const centreId = req.userId; // From token
    const events = await Event.find({ centreId });
    res.status(200).json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const centreId = req.userId; // From token
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

// Get details of a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const centreId = req.userId; // From token
    const event = await Event.findOne({ _id: id, centreId });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch event details" });
  }
};
