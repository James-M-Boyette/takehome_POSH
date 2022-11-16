import app from './app'
import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import healthRoutes from './src/routes/healthRoutes'
import eventRoutes from './src/routes/eventRoutes'

const server_port = Number(process.env.PORT) || 4000
const server_host = process.env.YOUR_HOST || '0.0.0.0'
const uri = process.env.MONGO_DB_URI!

const {log, group} = console

//* Database
// Connect to MongoDB Atlas (cloud) + Initialize API
mongoose
  .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    // Initialize
    app.listen(server_port, server_host, () => {
      log(`🚀 POSH Server listening on  '${server_host}:${server_port}'`)
    })
  })
  .catch(err => {
    log(err)
  })

// Database Connection Confirm + Info
mongoose.connection.once('open', async () => {
  group('Agenda initialized')
  log('Connected to Mongo Atlas')
  log('Mongo_IP:', process.env.MONGO_IP) // What's Mongo_IP ?
})

//* API
// Middleware: Request Logger
app.use((req, res, next) => {
  log(`Request made:   ${req.method}   ${req.path}`)
  next()
})

// Routes Handler ...
app.use('/api/health', healthRoutes)
app.use('/api/events', eventRoutes)
