import { Router } from "express";
import { getAllEvents, createNewEvent } from "../controllers/eventController";

const router = Router();

router.get("/", getAllEvents);
router.post("/", createNewEvent);

export default router;
