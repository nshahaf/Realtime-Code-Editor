import { useState, useEffect } from 'react'
import socket from '../socket/socket.js'

const useSocket = () => {
    const [socketData, setSocketData] = useState(null)

    useEffect(() => {
        //event listeners:
        socket.on('connect', () => {
            console.log('Connected to socket')
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from socket')
        })

        socket.on('your-event-name', (data) => {
            setSocketData(data)
        })

        return () => { // event listeners cleanup
            socket.off('connect')
            socket.off('disconnect')
            socket.off('your-event-name')
        }
    }, [])

    const emitData = (eventName, data) => {
        socket.emit(eventName, data)
    }

    return { socketData, emitData }
}

export default useSocket