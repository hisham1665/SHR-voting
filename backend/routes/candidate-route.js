import express from "express";
import { createCandidatesList, getCandidateList } from "../controllers/candidateController.js";

const Candidaterouter = express.Router();

// POST route to create a new candidates list
Candidaterouter.post("/create-candidate-list", createCandidatesList);
Candidaterouter.get("/get-candidate-list/:election_id", getCandidateList);

export default Candidaterouter;
