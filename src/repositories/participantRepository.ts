import {pool} from "../db";


export const registerParticipant = async (eventId: number, userId: number) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO participants (event_id, user_id) VALUES ($1, $2) RETURNING *',
      [eventId, userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error registering participant:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const getEventsForUser = async (userId: number) => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT e.* 
        FROM events e
        INNER JOIN participants p ON e.id = p.event_id
        WHERE p.user_id = $1
      `;
      const result = await client.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error("Error getting events for user:", error);
      throw error;
    } finally {
      client.release();
    }
  };
  
