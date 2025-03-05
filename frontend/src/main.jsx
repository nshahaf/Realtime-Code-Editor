import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './assets/styles/main.css'
import App from './App.jsx'
import { SocketProvider } from './socket/socketContext'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SocketProvider>
      {/* <StrictMode> */}
      <App />
      {/* </StrictMode> */}
    </SocketProvider>
  </BrowserRouter>
)
