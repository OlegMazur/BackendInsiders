import {pool} from "../db";
import { User } from "../models/User"; 


export const createUser = async (username:string, email:string, password:string) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return result.rows[0]; 
};


export const getUserByEmail = async (email: string):Promise<any> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};


export const getUserById = async (id: number) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};
