import express from "express"
const app=express();
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import {connectDB} from './config/db.js'
import dotenv from "dotenv";

dotenv.config();

//middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes",notesRoutes);
connectDB();
const PORT=process.env.PORT || 5001;
 

app.listen(PORT,()=>{
    console.log("Listening on port:",PORT);
})