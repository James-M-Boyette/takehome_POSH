import express from 'express'

import cors from 'cors'
const app = express()
app.use(cors())

// Middleware: parse body & add to request object
app.use(express.json())

export default app
