import { Request, Response } from "express";
import { registerParticipant, getEventsForUser, getParticipantsCountByEventId } from "../repositories/participantRepository";
import { getEventById } from "../repositories/eventRepository";

export const registerUserForEvent = async (req: Request, res: Response) => {
    const { eventId, userId } = req.body;
  
    try {
      const event = await getEventById(eventId);
      console.log(event, "event");
      if (!event) {
         res.status(404).json({ message: "Event not found" });
         return
      }
  
      const participantsCount = await getParticipantsCountByEventId(eventId);
 
      if (participantsCount >= event.max_participants) {
         res.status(400).json({ message: "Event is full. No more participants can be registered." });
          return
      }
  
      const participant = await registerParticipant(eventId, userId);
      res.status(201).json(participant);
    } catch (error) {
      console.error("Error registering participant:", error);
      res.status(500).json({ message: "Error registering participant", error });
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
