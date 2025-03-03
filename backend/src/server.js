import express from 'express'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import dotenv from 'dotenv'
import cors from 'cors'
import corsOptions from './util/cors.js'

import { Server } from 'socket.io'
import setupSocketConnection from './lib/socket/socket.js'

import chalk from 'chalk'
import { connectDatabase } from './lib/db.js'

dotenv.config() // load environment variables from a .env file into process.env
const __filename = fileURLToPath(import.meta.url) // path to server.js file
const __dirname = dirname(__filename) // path to src folder backend/src

const app = express()
app.use(express.json())

// Set up CORS for Express
if (process.env.NODE_ENV === 'production') {
    const buildPath = join(__dirname, '../public')
    app.use(express.static(buildPath))
} else {
    app.use(cors(corsOptions))
}

const server = createServer(app)
const io = new Server(server, { cors: corsOptions })
setupSocketConnection(io)

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello world</h1>')
})

app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' })
})

app.post('/test', (req, res) => {
    const body = req.body
    res.status(201).json(body)
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(chalk.green(`Server is running on port ${PORT}`))
    // connectDatabase()
})