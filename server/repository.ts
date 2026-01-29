import { pool } from './db.js'

export async function findByUsername(username: string) {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username])
  return rows[0] || null
}

export async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id])
  return rows[0] || null
}

export async function isUsernameTaken(username) {
  const [rows] = await pool.query('SELECT 1 FROM users WHERE username = ? LIMIT 1', [username])
  return !!rows.length
}

export async function isUsernameTakenByOther(username, id) {
  const [rows] = await pool.query('SELECT 1 FROM users WHERE username = ? AND id <> ? LIMIT 1', [
    username,
    id,
  ])
  return !!rows.length
}

export async function isEmailTaken(email) {
  const [rows] = await pool.query('SELECT 1 FROM users WHERE email = ? LIMIT 1', [email])
  return !!rows.length
}

export async function isEmailTakenByOther(email, id) {
  const [rows] = await pool.query('SELECT 1 FROM users WHERE email = ? AND id <> ? LIMIT 1', [
    email,
    id,
  ])
  return !!rows.length
}

export async function createUser({
  username,
  email,
  passwordHash,
  role = 'user',
  fullName,
  avatar,
}) {
  const [result] = await pool.query(
    'INSERT INTO users (username, email, full_name, avatar_url, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)',
    [username, email, fullName ?? username, avatar ?? null, passwordHash, role],
  )
  return { id: result.insertId, username, email, role, fullName, avatar }
}

export async function updateProfile(id, { username, email, fullName, avatar }) {
  const fields = []
  const values = []
  if (typeof username === 'string') {
    fields.push('username = ?')
    values.push(username)
  }
  if (typeof email === 'string') {
    fields.push('email = ?')
    values.push(email)
  }
  if (typeof fullName === 'string') {
    fields.push('full_name = ?')
    values.push(fullName)
  }
  if (typeof avatar === 'string') {
    fields.push('avatar_url = ?')
    values.push(avatar)
  }
  if (!fields.length) return null
  values.push(id)
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ? LIMIT 1`
  await pool.query(sql, values)
  return findById(id)
}

export default {
  findByUsername,
  findById,
  isUsernameTaken,
  isUsernameTakenByOther,
  isEmailTaken,
  isEmailTakenByOther,
  createUser,
  updateProfile,
}
