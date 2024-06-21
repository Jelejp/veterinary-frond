
import './App.css'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/Register' element={<Register/>} />
    <Route path='/Login' element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
