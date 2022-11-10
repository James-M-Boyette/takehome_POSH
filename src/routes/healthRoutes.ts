import express from 'express'

const router = express.Router()

/**
 * TODO
 * - Add types for routes
 */

// router.get('/api/health', (req, res) => {
// Note: since we're specifying the path in our index.ts, we no-longer need to stipulate the root here ...
router.get('/', (req, res) => {
  res.json({
    msg: `Welcome to POSH's backend ! \n Everything looks good so far ...`,
  })
})

export default router
