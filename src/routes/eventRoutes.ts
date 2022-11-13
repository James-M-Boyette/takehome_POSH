import express from 'express'

import {createEvent, getEvents} from '../controllers/eventController'

const eventRouter = express.Router()

/**
 * TODO
 * - Add types for routes
 */

// router.get('/api/', (req, res) => {
// Note: since we're specifying the path in our index.ts, we no-longer need to stipulate the root here ...
// eventRouter.get('/', (req, res) => {
//   res.json({
//     msg: `No Events yet ...`,
//   })
// })

// GET all events
eventRouter.get('/', getEvents)

// GET a single event
eventRouter.get('/:id', (req, res) => {
  res.json({
    msg: `GET a single event`,
  })
})

// POST a single event
eventRouter.post('/', createEvent)

// UPDATE a single event
eventRouter.patch('/:id', (req, res) => {
  res.json({
    msg: `UPDATE a single event`,
  })
})

// DELETE a single event
eventRouter.delete('/:id', (req, res) => {
  res.json({
    msg: `DELETE a single event`,
  })
})

export default eventRouter
