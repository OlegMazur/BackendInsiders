import { Router } from "express";
import { registerParticipant, getUserEvents } from "../controllers/participantController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/", authenticate, registerParticipant);
router.get("/:userId/events", getUserEvents);

export default router;
