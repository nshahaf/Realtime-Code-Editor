import express from 'express'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import dotenv from 'dotenv'
import cors from 'cors'
import chalk from 'chalk'
import corsOptions from './util/cors.js'
import codeBlocksRoutes from './api/codeBlock/codeBlock.route.js'
import { Server } from 'socket.io'
import socketHandler from './lib/socket.js'
import { connectDatabase } from './lib/db.js'


//*APP SETUP
dotenv.config() // load environment variables from a .env file into process.env
const __filename = fileURLToPath(import.meta.url) // path to server.js file
const __dirname = dirname(__filename) // path to src folder backend/src
const buildPath = join(__dirname, '../public')

const app = express()
app.use(express.json())


// Set up CORS for Express
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(buildPath))

} else {
    app.use(cors(corsOptions))
}



//CODE BLOCKS ROUTES
app.use('/api/codeblocks', codeBlocksRoutes)

// Serve index.html for all unknown routes
app.get('*', (req, res) => {
    // console.log(chalk.blue(req.url))
    res.sendFile(join(buildPath, 'index.html'))
})

//*SOCKETS SETUP
const server = createServer(app)
const io = new Server(server, {
    cors: process.env.NODE_ENV === 'production' ? {} : corsOptions,
    connectionStateRecovery: {
        maxDisconnectionDuration: 1 * 60 * 1000, // 1 minute
        onRecovery: (socket) => {
            console.log(chalk.yellow(`Socket ${socket.id} recovered`))
        }
    }
})


//*SOCKETS HANDLER
socketHandler(io)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(chalk.green(`Server is running on port ${PORT}`))
    connectDatabase()
})


