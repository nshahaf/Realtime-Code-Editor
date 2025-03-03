import socketHandlers from './socketHandlers.js'

const setupSocketConnection = (io) => {
    io.on('connection', socketHandlers)


    const emitEvent = (eventName, data) => {
        io.emit(eventName, data)
    }

    const emitEventToRoom = (room, eventName, data) => {
        io.to(room).emit(eventName, data)
    }

    return { emitEvent, emitEventToRoom }
}

export default setupSocketConnection