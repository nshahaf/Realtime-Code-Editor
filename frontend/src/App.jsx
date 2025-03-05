import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import CodeBlockPage from './pages/CodeBlockPage'
import LobbyPage from './pages/LobbyPage'

export default function App() {

  return (
    <div className='app-container'>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/codeBlock/:id" element={<CodeBlockPage />} />
        <Route path="*" element={<LobbyPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

