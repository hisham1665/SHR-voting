import { CandidatesList } from "../models/candidate.model.js";

// Utility to generate 12-digit candidate_list_id
const generateCandidateListId = (election_id) => {
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `${election_id}${random}`;
};

// POST: Create a new candidates list
export const createCandidatesList = async (req, res) => {
  try {
    const {
      election_id,
      boy_candidates = [],
      girl_candidates = []
    } = req.body;

    if (!election_id) {
      return res.status(400).json({ message: "election_id is required." });
    }

    // Generate unique candidate_list_id
    let candidate_list_id;
    let exists = true;
    while (exists) {
      candidate_list_id = generateCandidateListId(election_id);
      const existing = await CandidatesList.findOne({ candidate_list_id });
      if (!existing) exists = false;
    }

    // Ensure each candidate has SR_NO and Votes (Votes defaulted to 0 if not given)
    const processCandidates = (candidates) =>
      candidates.map(candidate => ({
        ...candidate,
        Votes: candidate.Votes || 0
      }));

    const newList = new CandidatesList({
      election_id,
      candidate_list_id,
      boy_candidates: processCandidates(boy_candidates),
      girl_candidates: processCandidates(girl_candidates)
    });

    const savedList = await newList.save();
    return res.status(201).json(savedList);
  } catch (error) {
    console.error("Error creating candidates list:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCandidateList = async (req, res) => {
  const { election_id } = req.params;

  try {
    const candidateList = await CandidatesList.findOne({ election_id });
    if (!candidateList) {
      return res.status(404).json({ message: "Candidate list not found" });
    }
    res.status(200).json(candidateList);
  } catch (error) {
    console.error("Error fetching candidate list:", error);
    res.status(500).json({ message: "Server error" });
  }
};