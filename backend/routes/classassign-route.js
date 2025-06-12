// routes/yearAssignRoutes.js
import express from "express";
import { createYearAssign, getFacultyAssignedClasses } from "../controllers/classAssignController.js";

const Assignrouter = express.Router();
Assignrouter.post("/assign-faculties", createYearAssign);
Assignrouter.post("/get-class", getFacultyAssignedClasses);
export default Assignrouter;
