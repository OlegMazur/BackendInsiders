import express, { Application } from "express";
import bodyParser from "body-parser";

const app: Application = express();


app.use(bodyParser.json());


import eventRoutes from "./routes/events";


app.use("/api/events", eventRoutes);


export default app;
