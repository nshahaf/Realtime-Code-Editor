import { io } from 'socket.io-client'
import { v4 as uuid } from 'uuid'

const id = localStorage.getItem('userId')
if (!id) localStorage.setItem('userId', uuid())

export const socket = io(import.meta.env.VITE_BASE_URL, {
    autoConnect: false, // Prevent auto connection
    transports: ['websocket'], // Use WebSocket transport
    auth: {
        userId: localStorage.getItem('userId')
    }
})





