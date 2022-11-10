import express from 'express'

import cors from 'cors'
const app = express()
app.use(cors())

// Middleware: parse body data & attach to request
app.use(express.json())

export default app
