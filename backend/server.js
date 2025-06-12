import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Connectdb } from './config/db.js';
import Userroutes from './routes/user-routes.js';
import path from 'path';
import cors from 'cors';
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
  // Fix the path to look for dist in the correct location
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));
  console.log("Running in production. Serving frontend...");
  console.log("Frontend path:", frontendPath); // Add this for debugging
  
  // Handle React routes (everything that doesn't start with /api)
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
  })
}

app.listen(5000, ()=> {
    Connectdb()
    console.log("server run at http://localhost:5000")
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to:', mongoose.connection.name);
      });
      
})