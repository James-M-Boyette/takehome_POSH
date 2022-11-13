import mongoose, {model} from 'mongoose'

const Schema = mongoose.Schema // Defines the structure of a document in a DB

const eventSchema = new Schema(
  {
    /**
     * TODO: FIX BELOW PROPS
     */
    title: {
      // title of the exercise
      type: String,
      required: true,
    },
    reps: {
      // how many reps were completed of the excersize
      type: Number,
      required: true,
    },
    load: {
      // how heavy should the weight be
      type: Number,
      required: true,
    },
  },
  {timestamps: true}, // auto-create timestamps for us
)

export default mongoose.model('Event', eventSchema) // First argument will create a "Event" collection, and the second applies the specified schema

// Event.find()

// Models apply schema to a model,
