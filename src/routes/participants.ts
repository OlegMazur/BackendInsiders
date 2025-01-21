import { Router } from "express";
import { registerUserForEvent, getParticipants } from "../controllers/participantController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/", authenticate, registerUserForEvent);
router.get("/:userId/events", getParticipants);

export default router;
