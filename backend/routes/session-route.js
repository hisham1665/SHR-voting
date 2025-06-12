import express from "express";
import { createSession, getSessionByElection, updateSessionController } from "../controllers/sessionController.js";

const Sessionrouter = express.Router();

// POST /api/session - Create session
Sessionrouter.post("/create-session", createSession);
Sessionrouter.get("/get-session/:election_id", getSessionByElection);
Sessionrouter.put("/stop-session", updateSessionController);

export default Sessionrouter;
