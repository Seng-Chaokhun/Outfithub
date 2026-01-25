import { Router } from 'express'
import * as AuthService from './services.js'

const router = Router()

router.get('/', (_, res) => res.send('auth route connected'))

router.post('/', async (req, res) => {
  try {
    const { action, data, payload } = req.body || {}
    const body = data ?? payload ?? null
    if (!body || typeof body !== 'object') {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid request payload', package: null })
    }
    const op = AuthService.inferAction(action, body)
    const result = await AuthService.handle(op, body)
    const status = 'code' in result && result.code ? result.code : undefined
    if (status) return res.status(status).json(result.body)
    return res.json(result.body)
  } catch (err) {
    console.error('Auth route error:', err)
    return res.status(500).json({ success: false, message: 'Internal server error', package: null })
  }
})

export default router
