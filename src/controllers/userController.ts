import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../repositories/userRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const SECRET_KEY = "your-secret-key";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
       res.status(400).json({ message: "User already exists" });
       return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser(username, email, hashedPassword);
   res.status(201).json(user);
   return
  } catch (error) {
     res.status(500).json({ message: "Error creating user", error });
     return
  }
};
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      
      const user = await getUserByEmail(email);
     
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
         res.status(401).json({ message: "Invalid credentials" });
         return
      }
  
     
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });
  
      
       res.status(200).json({ message: "Login successful", token });
       return
    } catch (error) {
      console.error("Error logging in user:", error);
       res.status(500).json({ message: "Server error", error });
       return
    }
  };