import express, { Application } from "express";
import bodyParser from "body-parser";
import eventRoutes from "./routes/events";
import userRoutes from "./routes/users";
import partisipantRoutes from "./routes/participants";
import { createDatabase, createTables } from "./db";
import dotenv from "dotenv";
const app: Application = express();

dotenv.config();
createDatabase("insiders") 
  .then(() => createTables("insiders")) 
  .catch((err) => console.error("Failed to initialize database and tables", err));


  
app.use(bodyParser.json());
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/partisipant", partisipantRoutes);

export default app;
