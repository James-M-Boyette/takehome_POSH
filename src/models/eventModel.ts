import mongoose, {model} from 'mongoose'

const Schema = mongoose.Schema // Defines the structure of a document in a DB

const eventSchema = new Schema(
  {
    // Name of Event
    name: {
      type: String,
      required: true,
    },
    // Flyer Image/Background for Event
    flyer: {
      type: String,
      required: true,
    },
    // Event's Group (image)
    groupAvi: {
      type: String,
      required: true,
    },
    // TimeZone
    timezone: {
      type: String,
      required: true,
    },
    // Start Time + Date
    startUtc: {
      type: String,
      required: true,
    },
    // End Time + Date
    endUtc: {
      type: String,
      required: true,
    },
    // Event Page URL
    url: {
      type: String,
      required: true,
    },
    // Venue
    venueName: {
      type: String,
      required: true,
    },
    // Event's Group (name)
    groupName: {
      type: String,
      required: true,
    },
    // Location
    location: {
      type: Object,
      required: true,
    },
  },
  {timestamps: true}, // auto-create timestamps for us
)

export default mongoose.model('Event', eventSchema) // First argument will
