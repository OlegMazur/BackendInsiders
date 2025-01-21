import { Request, Response } from "express";
import { registerParticipant, getEventsForUser } from "../repositories/participantRepository";

export const registerUserForEvent = async (req: Request, res: Response) => {
  const { eventId, userId } = req.body;
  
  try {
    const participant = await registerParticipant(eventId, userId);
     res.status(201).json(participant);
     return
  } catch (error) {
     res.status(500).json({ message: "Error registering participant", error });
     return
  }
};

export const getParticipants = async (req: Request, res: Response) => {
  const { userId } = req.params;
  
  if (isNaN(Number(userId))) {
    res.status(400).json({ message: "Invalid eventId parameter" });
    return
  }
  try {
    const participants = await getEventsForUser(Number(userId));
     res.status(200).json(participants);
     return
  } catch (error) {
     res.status(500).json({ message: "Error fetching participants", error });
     return
  }
};
