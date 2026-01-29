import express, { Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import type { RowDataPacket } from 'mysql2'
import AuthRouter from './auth.route.js'
import ProfileRouter from './profile.route.js'
import { pool, ensureSchema } from './db.js'

// setup! initialize app
const app = express()

// setup! use dependencies
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)

// setup! config environment variables
dotenv.config()

// setup! store environment variables (default to 3000 if not provided)
const API_PORT = Number(process.env.API_PORT ?? 3000)

// setup! ensure database schema exists
await ensureSchema()

// setup! mount routers
const authRouter: Router = AuthRouter
const profileRouter: Router = ProfileRouter
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)

// listen! listen on API port
app.listen(API_PORT, () => console.log(`API Listening on port: ${API_PORT}`))

// test! database connectivity
const [rows] = await pool.query<RowDataPacket[]>('SELECT 1 AS ok')
console.log('Database connectivity OK:', rows[0]?.ok === 1)
