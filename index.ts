import app from './app'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const server_port = Number(process.env.PORT) || 4000
const server_host = process.env.YOUR_HOST || '0.0.0.0'

const uri = process.env.MONGO_DB_URI!

//* Database
mongoose
  .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then()
  .catch(err => {
    console.log(err)
  })

mongoose.connection.once('open', async () => {
  console.log('Connected to Mongo')
  console.log('Mongo_IP:', process.env.MONGO_IP)

  console.log('Agenda initialized')
})

//* API
// Middleware: request logger
app.use((req, res, next) => {
  console.log('Path:', req.path)
  console.log('Request method =', req.method)
  next()
})

// Routes Handler ...
import eventRoutes from './src/routes/eventRoutes'
import healthRoutes from './src/routes/healthRoutes'

// app.get('/api/health', (req, res) => {
//   res.json({
//     msg: `Welcome to POSH's backend ! \n Everything looks good so far ...`,
//   })
// }) // This is the basic express route; much better to use MVC architecture, including a 'routes' folder & files

// app.use(healthRoutes) // We could specify the endpoint roots in our route files, but this is clearer for 'at-a-glance' viewing ...
app.use('/api/health', healthRoutes)
app.use('/api/events', eventRoutes)

// API Listening for requests ...
app.listen(server_port, server_host, () => {
  console.log(`🚀 Running POSH Server on PORT: ${server_port}`)
})
