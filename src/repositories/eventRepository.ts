import {pool} from "../db";

export const createEvent = async (name: string, description: string, date: string, location: string, maxParticipants: number) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO events (name, description, date, location, max_participants) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, date, location, maxParticipants]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const getEvents = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM events');
    return result.rows;
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  } finally {
    client.release();
  }
};
