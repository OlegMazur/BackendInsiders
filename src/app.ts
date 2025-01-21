import express, { Application } from "express";
import bodyParser from "body-parser";
import eventRoutes from "./routes/events";
import userRoutes from "./routes/users";
import partisipantRoutes from "./routes/participants";

const app: Application = express();


app.use(bodyParser.json());
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/partisipant", partisipantRoutes);

export default app;
