import express from "express";
import { createElection, getElections, stopElection } from "../controllers/ElectionController.js";

const Electionrouter = express.Router();

// POST /api/election - Create a new election (with generated election_id)
Electionrouter.post("/create-election", createElection);
Electionrouter.get("/get-election", getElections);
Electionrouter.patch("/stop-election/", stopElection);

export default Electionrouter;

