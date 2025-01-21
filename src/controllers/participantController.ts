import { Request, Response } from "express";
import { Participant } from "../models/Participant";

import { events } from "./eventController";

const participants: Participant[] = [];


export const registerParticipant = (req: Request, res: Response) => {
  const { eventId, userId } = req.body;
  const event = events.find((e) => e.id === eventId);
  
  if (!event) {
     res.status(404).json({ message: "Event not found" });
     return
  }

  
  const registeredCount = participants.filter((p) => p.eventId === eventId).length;
  if (registeredCount >= event.maxParticipants) {
     res.status(400).json({ message: "Event is full" });
     return
  }

  const newParticipant: Participant = {
    id: String(participants.length + 1),
    eventId,
    userId,
  };

  participants.push(newParticipant);
  res.status(201).json({ message: "Participant registered successfully", participant: newParticipant });
};
export const getUserEvents = (req: Request, res: Response) => {
    const { userId } = req.params;
  
    const userEvents = participants
      .filter((p) => p.userId === userId)
      .map((p) => events.find((e) => e.id === p.eventId));
  
    res.json(userEvents);
  };
  