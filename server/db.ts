import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASS = 'secret',
  DB_DATABASE = 'outfithub',
} = process.env

// createPool can connect more clients than createConnection
export const pool = mysql.createPool({
  // connection detail
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  // pool options
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function ensureSchema() {
  // Create a minimal users table if it doesn't exist
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      full_name VARCHAR(255) NULL,
      avatar_url TEXT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  await pool.query(sql)

  // ensure new columns exist for existing tables
  await pool.query(
    'ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name VARCHAR(255) NULL AFTER email',
  )
  await pool.query(
    'ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT NULL AFTER full_name',
  )
}

export default { pool, ensureSchema }
