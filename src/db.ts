import { Pool } from "pg";


const pool = new Pool({
  user: "postgres",   
  host: "localhost",       
  database: "postgres", 
  password: "postgres",
  port: 5432,               
});
const createDatabase = async (dbName: string) => {
    const client = await pool.connect();
    try {
      
      const result = await client.query(`
        SELECT 1 FROM pg_database WHERE datname = $1
      `, [dbName]);
  
      if (result.rowCount === 0) {
        
        await client.query(`CREATE DATABASE ${dbName}`);
        console.log(`Database ${dbName} created successfully.`);
      } else {
        console.log(`Database ${dbName} already exists.`);
      }
    } catch (error) {
      console.error("Error creating database:", error);
    } finally {
      client.release();
    }
  };
  
  const createTables = async (dbName: string) => {
    const client = new Pool({
      user: "postgres",
      host: "localhost",
      database: dbName, 
      password: "postgres",
      port: 5432,
    });
  
    const conn = await client.connect();
    try {
      await conn.query('BEGIN'); 
  
      
      await conn.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );
      `);
  
      
      await conn.query(`
        CREATE TABLE IF NOT EXISTS events (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          date TIMESTAMP NOT NULL,
          location VARCHAR(255),
          max_participants INT NOT NULL
        );
      `);
  
     
      await conn.query(`
        CREATE TABLE IF NOT EXISTS participants (
          id SERIAL PRIMARY KEY,
          event_id INT REFERENCES events(id) ON DELETE CASCADE,
          user_id INT REFERENCES users(id) ON DELETE CASCADE
        );
      `);
  
      await conn.query('COMMIT'); 
      console.log("Tables created successfully!");
    } catch (error) {
      await conn.query('ROLLBACK'); 
      console.error("Error creating tables:", error);
    } finally {
      conn.release();
    }
  };
  
  export { pool, createDatabase, createTables };