
import './App.css'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Services from './pages/Services'
import Account from './pages/Account'
import ServiceDetails from './pages/ServiceDetails'

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/Register' element={<Register/>} />
    <Route path='/Login' element={<Login/>} />
    <Route path='/auth/services' element={<Services/>} />
    {/* <Route path='/auth/service/details' element={<ServiceDetails/>} /> */}
    <Route path="auth/service/:name" element={<ServiceDetails/>} />
    <Route path='/auth/account' element={<Account/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
