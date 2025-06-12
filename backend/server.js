import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Connectdb } from './config/db.js';
import Userroutes from './routes/user-routes.js';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import Electionrouter from './routes/election-route.js';
import Sessionrouter from './routes/session-route.js';
import Candidaterouter from './routes/candidate-route.js';
import Voterouter from './routes/vote-route.js';
import Assignrouter from './routes/classassign-route.js';
import Winnerrouter from './routes/winner-route.js';
dotenv.config()
const app = express();

app.use(cors({
    origin: "http://localhost:5173",  // Your React app URL
    credentials: true,                // If you plan to use cookies or authentication
  }));
const __dirname = path.resolve();
app.use(express.json())
app.use("/api/user/", Userroutes)
app.use("/api/election/",Electionrouter)
app.use("/api/session/",Sessionrouter)
app.use("/api/candidate/", Candidaterouter)
app.use("/api/vote/",Voterouter)
app.use("/api/assign/",Assignrouter )
app.use("/api/winner/",Winnerrouter)
if(process.env.NODE_ENV === "production"){
  const frontendPath = path.resolve(process.cwd(), "frontend/dist");
  const indexPath = path.resolve(process.cwd(), "frontend/dist/index.html");
  // Check if the build files exist
  if (fs.existsSync(frontendPath) && fs.existsSync(indexPath)) {
    app.use(express.static(frontendPath));
    console.log("Running in production. Serving frontend...");
    console.log("Frontend path:", frontendPath);
    
    app.get(/^(?!\/api).*/, (req, res) => {
      res.sendFile(indexPath);
    });
  } else {
    console.error("Frontend build files not found at:", frontendPath);
    console.error("Please run 'npm run build' in the frontend directory");
    
    // Fallback route for missing frontend
    app.get(/^(?!\/api).*/, (req, res) => {
      res.status(404).send("Frontend build files not found. Please build the frontend first.");
    });
  }
}

app.listen(5000, ()=> {
    Connectdb()
    console.log("server run at http://localhost:5000")
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to:', mongoose.connection.name);
      });
      
})