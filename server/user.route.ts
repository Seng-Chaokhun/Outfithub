import { Router } from 'express';
import * as repository from './repository';
import { pool } from './db';

const router = Router();

// GET /users - fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await repository.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// PUT /users/:id - update user (name/email)
router.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }
    const user = await repository.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // updateProfile expects all fields: username, email, fullName, avatar
    await repository.updateProfile(id, {
      username: user.username,
      email,
      fullName: name,
      avatar: user.avatar_url || null,
    });
    res.json({ message: 'User updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user.' });
  }
});

// DELETE /users/:id - delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await repository.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user.' });
  }
});

export default router;
