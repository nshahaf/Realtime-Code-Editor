import express from 'express'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import dotenv from 'dotenv'
import cors from 'cors'
import corsOptions from './util/cors.js'
import codeBlocksRoutes from './api/codeBlock/codeBlock.route.js'
import { Server } from 'socket.io'

import chalk from 'chalk'
import { connectDatabase } from './lib/db.js'

//*APP SETUP
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

//TEST ROUTE
app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello world</h1>')
})

//CODE BLOCKS ROUTES
app.use('/api/codeblocks', codeBlocksRoutes)


//*SOCKETS SETUP
const server = createServer(app)
const io = new Server(server, {
    cors: corsOptions, connectionStateRecovery: {
        maxDisconnectionDuration: 1 * 60 * 1000,
    }
})


const rooms = {} //* { roomId: { users: [{userId, role}]} }
const users = {} //* { userId: { roomId, role } }

//*SOCKET HANDLERS
io.on('connection', (socket) => {
    const { userId } = socket.handshake.auth
    console.log(chalk.yellow(`User ${userId} connected`))
    socket.emit('server:rooms-data', { roomsData: { ...rooms } })// emit to self

    socket.on('client:join-room', (roomId) => {
        rooms[roomId] = rooms[roomId] || { users: [] } // create room if it doesn't exist
        socket.join(roomId) // join the socket room

        const userExists = rooms[roomId].users.some(user => user.userId === userId)
        if (userExists) {
            const role = users[userId].role
            socket.emit('server:join-room', { role, roomId, roomsData: { ...rooms } }) //emit to self

        } else {
            const role = rooms[roomId].users.length === 0 ? 'mentor' : 'student' // assign role
            const user = { userId, role } // create user object 

            rooms[roomId].users.push(user) // add user to the room users array

            users[userId] = { roomId, role } // add user to the users object

            socket.emit('server:join-room', { role, roomId, roomsData: { ...rooms } }) //emit to self
            socket.broadcast.emit('server:rooms-data', { roomsData: { ...rooms } }) // emit to others

            console.log(chalk.yellow(`User ${socket.id} joined room ${roomId}`))
        }
    })

    socket.on('client:code-change', ({ code, roomId, userId }) => {
        socket.to(roomId).emit('server:code-change', { senderCode: code, senderId: userId }) // emit to all in room except the sender
    })

    socket.on('client:leave-room', (roomId) => {
        const role = users[userId] ? users[userId].role : null
        if (role === 'mentor') {
            socket.to(roomId).emit('server:mentor-left') // emit to all in room except the sender
        }

        socket.leave(roomId) // leave the socket room

        rooms[roomId].users = rooms[roomId].users.filter(user => user.userId !== userId) // remove the user from the users array
        delete users[userId] // remove user from the users object
        socket.emit('server:leave-room', { roomsData: rooms }) //emit to self
        socket.broadcast.emit('server:rooms-data', { roomsData: { ...rooms } }) // emit to others

        console.log(chalk.yellow(`User ${socket.id} left room ${roomId}`))

    })



    socket.on('disconnect', () => {
        console.log(chalk.yellow(`User ${userId} disconnected`))
        const roomId = users[userId]?.roomId
        const role = users[userId]?.role
        if (roomId) {
            rooms[roomId].users = rooms[roomId].users.filter(user => user.userId !== userId) // remove the user from the users array
            delete users[userId] // remove user from the users object
            io.emit('server:rooms-data', { roomsData: { ...rooms } }) // emit to all
        }
        if (role === 'mentor') {
            socket.broadcast.emit('server:mentor-left') // emit to all except the sender
        }
    })




    // socket.on('disconnect', () => {
    //     const index = rooms[roomId].users.indexOf(user) // find the index of the disconnected user

    //     rooms[roomId].users.splice(index, 1) // remove the user from the users array
    //     socket.leave(roomId) //leave the socket room


    //     console.log(chalk.yellow(`User ${userId} disconnected`))
    //     console.log(JSON.stringify(rooms, null, 2)) // Pretty-print the rooms object

    //     socket.emit('update-rooms-data', rooms) // will not be send to the disconnected user
    // })

})


//io.emit - to all clients
//socket.emit - to one client
//socket.broadcast.emit - to all clients except the sender
//!socket.join(room) - to join a room
//!socket.leave(room) - to leave a room
//socket.rooms - to get the rooms the client is in
//!socket.to(room).emit - to all clients in the room except the sender
//io.to(room).emit - to all clients in the room including the sender
//socket.id - to get the id of the client

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(chalk.green(`Server is running on port ${PORT}`))
    connectDatabase()
})


