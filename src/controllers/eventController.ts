import Event from '../models/eventModel'

/**
 * TODO: convert this to typescript
 */

// get all events
const getEvents = async (req: any, res: any) => {
  try {
    const events = await Event.find({}).sort({createdAt: -1}) // could search for specific things like `reps: 20`
    res.status(200).json(events)
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})
  }
}

// get a single event

// create a new event
const createEvent = async (req: any, res: any) => {
  /**
   * TODO: FIX BELOW PROPS
   */
  const {title, load, reps} = req.body

  // add document to DB
  try {
    /**
     * TODO: FIX BELOW PROPS
     */
    const event = await Event.create({
      title,
      load,
      reps,
    })
    res.status(200).json(event)
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})
  }
}

// delete a event

// update a event

export {createEvent, getEvents}
