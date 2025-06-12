import Vote from "../models/vote.model.js"; // Adjust path as needed

// POST: Cast a vote
export const castVote = async (req, res) => {
  try {
    const { election_id, session_id, boy_vote_sr_no, girl_vote_sr_no } = req.body;

    // Validate required fields
    if (!election_id || !session_id || !boy_vote_sr_no || !girl_vote_sr_no) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newVote = new Vote({
      election_id,
      session_id,
      boy_vote_sr_no,
      girl_vote_sr_no
    });

    const savedVote = await newVote.save();
    res.status(201).json(savedVote);
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
