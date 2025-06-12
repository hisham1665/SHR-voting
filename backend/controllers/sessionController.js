import Session from "../models/Session.model.js"; // Adjust path as needed

// Utility: Generate 8-digit session_id (random 4 digits + current year)
const generateSessionId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000); // random 4-digit
  return `${random}${year}`;
};

// POST: Create new session
export const createSession = async (req, res) => {
  try {
    const { election_id, candidate_list_id, session_class } = req.body;

    // Validate required fields
    if (!election_id || !candidate_list_id || !session_class) {
      return res.status(400).json({ message: "election_id, candidate_list_id, and session_class are required." });
    }

    // Generate unique session_id
    let session_id;
    let exists = true;
    while (exists) {
      session_id = generateSessionId();
      const existing = await Session.findOne({ session_id });
      if (!existing) exists = false;
    }

    const newSession = new Session({
      election_id,
      candidate_list_id,
      session_class,
      session_id,
      isActive: true
    });

    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSessionByElection = async (req, res) => {
  const { election_id } = req.params;

  try {
    const session = await Session.findOne({ election_id });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateSessionController = async (req, res) => {
  const { session_id, isActive } = req.body;

  try {
    const session = await Session.findOne({ session_id });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.isActive = isActive;
    await session.save();

    res.status(200).json({
      message: `Session ${isActive ? "started" : "stopped"} successfully`,
      session,
    });
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ error: "Server error while updating session" });
  }
};