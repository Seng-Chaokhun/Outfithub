import { Router } from 'express'
import * as ProfileService from './profile.services.js'

const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const result = await ProfileService.getProfile(req.params.id)
    if ('code' in result && result.code) return res.status(result.code).json(result.body)
    return res.json(result.body)
  } catch (err) {
    console.error('Profile route error (GET):', err)
    return res.status(500).json({ success: false, message: 'Internal server error', payload: null })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const result = await ProfileService.updateProfile(req.params.id, req.body || {})
    if ('code' in result && result.code) return res.status(result.code).json(result.body)
    return res.json(result.body)
  } catch (err) {
    console.error('Profile route error (PUT):', err)
    return res.status(500).json({ success: false, message: 'Internal server error', payload: null })
  }
})

export default router
