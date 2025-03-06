import chalk from 'chalk'
import testUserCode from './vm.js'
import { testFunctions } from '../util/testFunctions.js'
const socketHandler = (io) => {

    const rooms = {} //* { roomId: { users: [{userId, role}]} }
    const users = {} //* { userId: { roomId, role } }

    //*SOCKET HANDLERS
    io.on('connection', (socket) => {
        const { userId } = socket.handshake.auth
        console.log(chalk.yellow(`User ${userId} connected`))
        socket.emit('server:rooms-data', { roomsData: { ...rooms } })// emit to self


        //* ON CLIENT JOIN ROOM
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

                // console.log(chalk.yellow(`User ${socket.id} joined room ${roomId}`)) //for debugging
            }
        })


        //* ON CLIENT CODE CHANGE
        socket.on('client:code-change', ({ code, roomId, test }) => {
            socket.to(roomId).emit('server:code-change', { senderCode: code, senderId: userId }) // emit to all in room except the sender

            const isSolved = testUserCode(code, testFunctions[test]) // test the user code
            if (isSolved) {
                // console.log('code solved', isSolved) //for debugging
                io.to(roomId).emit('server:code-solved')// emit to all in room include the sender
            }
        })

        socket.on('client:code-reset', ({ roomId }) => {
            socket.to(roomId).emit('server:code-reset') // emit to all in room except the sender
        })


        //* ON CLIENT LEAVE ROOM
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

            // console.log(chalk.yellow(`User ${socket.id} left room ${roomId}`)) //for debugging

        })


        //* ON CLIENT DISCONNECT
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
    })
}

export default socketHandler



//*SOCKETS HANDLERS:
//io.on('connection', callback) - to listen for a socket client connection
//socket.on('event-name', callback) - to listen for a custom event
//socket.on('disconnect', callback) - to listen for a socekt client disconnection

//*SOCKETS EMITTERS:
//socket.emit - to self
//socket.broadcast.emit - to all clients except the sender
//io.emit - to all clients include the sender
//socket.join(room) - to join a room
//socket.leave(room) - to leave a room
//socket.to(room).emit - to all clients in the room except the sender
//io.to(room).emit - to all clients in the room including the sender
//socket.on('event', callback) - to listen for an event

//*SOCKETS AUTHENTICATION:
//socket.handshake.auth - to get the authentication data (userId in this case)


