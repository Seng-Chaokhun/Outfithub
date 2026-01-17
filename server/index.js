import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

// setup! initialize app
const app = express()

// setup! use dependencies
app.use(express.json())
app.use(cors())

// setup! config environment variables
dotenv.config()

// setup! store environment variables
const API_PORT = Number(process.env.API_PORT)
const DB_PORT = Number(process.env.DB_PORT)

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_DATABASE = process.env.DB_DATABASE

// setup! establish connection
const conn = await mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
})

// get! use sample get
app.get('/', (req, res) => {
  res.send('Connected!')
})

// listen! listen on web app and database
app.listen(DB_PORT, () => console.log(`Listening on port: ${DB_PORT}`))
app.listen(API_PORT, () => console.log(`Listening on port: ${API_PORT}`))

// test! test query
const [rows] = await conn.query('SELECT 1')
await conn.end()

// test! print query
console.log(`Database Response:`)
console.log(rows)
