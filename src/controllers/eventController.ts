import { Request, Response } from "express";
import { Event } from "../models/Event";

const events: Event[] = [];

export const getAllEvents = (req: Request, res: Response) => {
  res.json(events);
};

export const createEvent = (req: Request, res: Response) => {
  const { name, description, date, location, maxParticipants } = req.body;
  const newEvent: Event = {
    id: String(events.length + 1),
    name,
    description,
    date: new Date(date),
    location,
    maxParticipants,
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
};
