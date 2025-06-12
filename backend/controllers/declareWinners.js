import Vote from "../models/vote.model.js";
import { CandidatesList } from "../models/candidate.model.js";
 // update the path as per your structure

export const declareWinners = async (req, res) => {
  const { candidate_list_id, session_id } = req.body;

  if (!candidate_list_id || !session_id) {
    return res.status(400).json({ message: "Missing candidate_list_id or session_id" });
  }

  try {
    const votes = await Vote.find({ session_id });
    const candidateList = await CandidatesList.findOne({ candidate_list_id });

    if (!candidateList) {
      return res.status(404).json({ message: "Candidate list not found" });
    }

    // Step 1: Initialize vote counts
    const boyVotesMap = {};
    const girlVotesMap = {};

    // Step 2: Count votes from each document
    for (const vote of votes) {
      // Boy vote
      const boySR = vote.boy_vote_sr_no;
      if (boySR) boyVotesMap[boySR] = (boyVotesMap[boySR] || 0) + 1;

      // Girl vote
      const girlSR = vote.girl_vote_sr_no;
      if (girlSR) girlVotesMap[girlSR] = (girlVotesMap[girlSR] || 0) + 1;
    }

    // Step 3: Update candidateList with vote counts
    candidateList.boy_candidates.forEach(candidate => {
      candidate.Votes = boyVotesMap[candidate.SR_NO] || 0;
    });

    candidateList.girl_candidates.forEach(candidate => {
      candidate.Votes = girlVotesMap[candidate.SR_NO] || 0;
    });

    // Step 4: Find top boy and girl winners
    const boy_winner = candidateList.boy_candidates.reduce((prev, curr) => {
      return curr.Votes > (prev?.Votes || 0) ? curr : prev;
    }, null);

    const girl_winner = candidateList.girl_candidates.reduce((prev, curr) => {
      return curr.Votes > (prev?.Votes || 0) ? curr : prev;
    }, null);

    // Save winners
    candidateList.boy_winner = boy_winner ? {
      name: boy_winner.name,
      SR_NO: boy_winner.SR_NO,
      Votes: boy_winner.Votes
    } : null;

    candidateList.girl_winner = girl_winner ? {
      name: girl_winner.name,
      SR_NO: girl_winner.SR_NO,
      Votes: girl_winner.Votes
    } : null;

    await candidateList.save();

    return res.status(200).json({
      message: "Votes tallied and winners declared",
      boy_winner: candidateList.boy_winner,
      girl_winner: candidateList.girl_winner
    });
  } catch (error) {
    console.error("Error declaring winners:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
