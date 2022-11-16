import Event from '../models/eventModel'

// GET all events
const getEvents = async (req: any, res: any) => {
  try {
    const events = await Event.find({}).sort({createdAt: -1}) // could search for specific things like `reps: 20`
    res.status(200).json(events)
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})
  }
}

export {getEvents}
