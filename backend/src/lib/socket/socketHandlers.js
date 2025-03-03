const socketHandlers = (socket) => {
    console.log('Client connected')

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })

    socket.on('send-message', (data) => {
        console.log('Received message:', data)
        // Handle the message here
    })

    socket.on('join-room', (room) => {
        socket.join(room)
    })

    socket.on('leave-room', (room) => {
        socket.leave(room)
    })
}

export default socketHandlers