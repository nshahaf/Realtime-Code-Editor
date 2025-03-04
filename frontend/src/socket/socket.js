import io from 'socket.io-client'

const socketUrl = import.meta.env.VITE_SOCKET_URL

const socketOptions = {

}

const socket = io(socketUrl, socketOptions)

export default socket