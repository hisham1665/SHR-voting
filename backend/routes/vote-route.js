import express from "express";
import { castVote } from "../controllers/voteController.js";

const Voterouter = express.Router();

// POST /api/vote - Cast a vote
Voterouter.post("/cast-vote", castVote);

export default Voterouter;
