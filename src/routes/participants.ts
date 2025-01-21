import { Router } from "express";
import { registerParticipant, getUserEvents } from "../controllers/participantController";

const router = Router();

router.post("/", registerParticipant);
router.get("/:userId/events", getUserEvents);

export default router;
