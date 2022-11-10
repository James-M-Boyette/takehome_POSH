import express from 'express'

const eventRouter = express.Router()

/**
 * TODO
 * - Add types for routes
 */

// router.get('/api/', (req, res) => {
// Note: since we're specifying the path in our index.ts, we no-longer need to stipulate the root here ...
eventRouter.get('/', (req, res) => {
  res.json({
    msg: `No Events yet ...`,
  })
})

// GET all workouts
eventRouter.get('/', (req, res) => {
  res.json({
    msg: `GET all workouts ...`,
  })
})

// GET a single workout
eventRouter.get('/:id', (req, res) => {
  res.json({
    msg: `GET a single workout`,
  })
})

// POST a single workout
eventRouter.post('/', (req, res) => {
  res.json({
    msg: `POST a single workout`,
  })
})

// UPDATE a single workout
eventRouter.patch('/:id', (req, res) => {
  res.json({
    msg: `UPDATE a single workout`,
  })
})

// DELETE a single workout
eventRouter.delete('/:id', (req, res) => {
  res.json({
    msg: `DELETE a single workout`,
  })
})

export default eventRouter
