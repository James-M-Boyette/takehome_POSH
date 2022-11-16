import express from 'express'

import {getEvents} from '../controllers/eventController'

const eventRouter = express.Router()

// GET all events
eventRouter.get('/', getEvents)

// GET a single event
eventRouter.get('/:id', (req: any, res: any) => {
  res.json({
    msg: `GET a single event`,
  })
})

export default eventRouter
