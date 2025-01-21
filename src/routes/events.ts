import { Router } from "express";
import { getAllEvents, createEvent } from "../controllers/eventController";

const router = Router();

router.get("/", getAllEvents);
router.post("/", createEvent);

export default router;
