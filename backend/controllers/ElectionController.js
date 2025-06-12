import Election from "../models/Election.model.js";

// Utility to generate election_id
const generateElectionId = (year) => {
  const randomFourDigits = Math.floor(1000 + Math.random() * 9000); // random 4-digit number
  return `${randomFourDigits}${year}`;
};

// POST: Create a new election with generated election_id
export const createElection = async (req, res) => {
  try {
    const { election_year, isActive } = req.body;

    if (!election_year) {
      return res.status(400).json({ message: "election_year is required." });
    }

    // Generate unique election_id
    let election_id;
    let exists = true;
    while (exists) {
      election_id = generateElectionId(election_year);
      const existing = await Election.findOne({ election_id });
      if (!existing) exists = false;
    }

    const newElection = new Election({
      election_id,
      election_year,
      isActive: isActive !== undefined ? isActive : true
    });

    const savedElection = await newElection.save();
    res.status(201).json(savedElection);
  } catch (error) {
    console.error("Error creating election:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// GET: Fetch all elections (with optional filters)
export const getElections = async (req, res) => {
  try {
    const { isActive, year } = req.query;

    // Build query object based on filters
    const query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === "true"; // from query string
    }
    if (year) {
      query.election_year = parseInt(year);
    }

    const elections = await Election.find(query).sort({ election_year: -1 }); // latest first
    return res.status(200).json(elections);
  } catch (error) {
    console.error("Error fetching elections:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// PATCH: Stop an election using election_id
export const stopElection = async (req, res) => {
  try {
    const { election_id } = req.body;

    if (!election_id) {
      return res.status(400).json({ message: "election_id is required" });
    }

    const updatedElection = await Election.findOneAndUpdate(
      { election_id },
      { isActive: false },
      { new: true }
    );

    if (!updatedElection) {
      return res.status(404).json({ message: "Election not found" });
    }

    res.status(200).json({ message: "Election stopped successfully", updatedElection });
  } catch (error) {
    console.error("Error stopping election:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};