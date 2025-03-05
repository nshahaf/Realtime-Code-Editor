import { createContext, useEffect, useState } from 'react'
import { socket } from './socketClient'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
// Create the SocketContext
const SocketContext = createContext()

// Context Provider for the app
export const SocketProvider = ({ children }) => {
    const navigate = useNavigate()
    const [roomsData, setRoomsData] = useState({})
    const [roomId, setRoomId] = useState(null)
    const [role, setRole] = useState(null)
    const emitEvent = (event, data) => socket.emit(event, data)

    useEffect(() => {
        socket.connect() // connect on mount

        socket.on('server:rooms-data', (data) => {
            setRoomsData(data.roomsData)
            console.log('server:rooms-data:', data)
        })

        socket.on('server:join-room', (data) => {
            setRole(data.role)
            setRoomId(data.roomId)
            setRoomsData(data.roomsData)
            console.log('server:join-room:', data)
        })

        socket.on('server:leave-room', (data) => {
            setRole(null)
            setRoomId(null)
            setRoomsData(data.roomsData)
            console.log('server:leave-room:', data)
        })

        socket.on('server:mentor-left', () => {
            toast.error('Mentor has left the room')

            navigate('/')
            console.log('server:mentor-left:')
        })

        // Cleanup on unmount
        return () => {
            socket.off('server:rooms-data')
            socket.off('server:join-room')
            socket.off('server:leave-room')
            socket.off('server:mentor-left')
            socket.removeAllListeners()
            socket.disconnect()
        }
    }, [socket])


    return (
        <SocketContext.Provider value={{ socket, roomId, setRoomId, role, setRole, emitEvent, roomsData, setRoomsData }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext }


