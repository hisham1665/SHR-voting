import express from "express";
import { declareWinners } from "../controllers/declareWinners.js";

const  Winnerrouter = express.Router();

 Winnerrouter.put("/declare-winner", declareWinners);

export default Winnerrouter;
