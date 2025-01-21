import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const users: User[] = [];

const SECRET_KEY = "your-secret-key";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

 
  if (users.some((user) => user.email === email)) {
     res.status(400).json({ message: "Email already exists" });
     return
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: String(users.length + 1),
    username,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  res.status(201).json({ message: "User registered successfully", user: newUser });
};
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
     
      const user = users.find((u) => u.email === email);
      if (!user) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
      }
  
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
      }
  
      
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  