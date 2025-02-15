import { useState } from 'react'
import './App.css'
import Login from './pages/Login/Login'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
