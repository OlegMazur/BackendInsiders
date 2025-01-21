import { Request, Response } from "express";
import { createEvent, getEvents } from "../repositories/eventRepository";

export const createNewEvent = async (req: Request, res: Response) => {
  const { name, description, date, location, maxParticipants } = req.body;
  
  try {
    const event = await createEvent(name, description, date, location, maxParticipants);
     res.status(201).json(event);
     return
  } catch (error) {
     res.status(500).json({ message: "Error creating event", error });
     return
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await getEvents();
     res.status(200).json(events);
     return
  } catch (error) {
     res.status(500).json({ message: "Error fetching events", error });
     return
  }
};
