
import './App.css'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Services from './pages/Services'
import Account from './pages/Account'
import ServiceDetails from './pages/ServiceDetails'
import Veterinary from './pages/Veterinary'
import RoutesAuth from './HOCs/RoutesAuth'
import RoutesNoAuth from './HOCs/RoutesNoAuth'
import AdminPanel from './components/AdminPanel'
import RoutesAuthAdmin from './HOCs/RoutesAuthAdmin'

const routesAuth = [{
  path: '/auth/account',
  element: <Account />,
  key: 'accounts',
},
{
  path: '/auth/services',
  element: <Services />,
  key: 'services',
},
{
  path: '/auth/service/:id',
  element: <ServiceDetails />,
  key: 'servicedetails',
},
{
  path: '/auth/Veterinary',
  element: <Veterinary />,
  key: 'veterinary',
},
{
  path: '/auth/admin',
  element: <AdminPanel />,
  key: 'adminPanel',
}
]
const routesNoAuth = [{
  path: '/Login',
  element: <Login />,
  key: 'login',
},
{
  path: '/Register',
  element: <Register />,
  key: 'register',

},

{
  path: '/',
  element: <Home />,
  key: 'home',

}
]

const routesAdmin = [
  {
    path: '/auth/admin',
    element: <AdminPanel />,
    key: 'adminPanel',
  },
];
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {
          routesAdmin.map(RoutesAuthAdmin)
        }
        <Route>
          {
            routesAuth.map(RoutesAuth)
          }
        </Route>
        {
          routesNoAuth.map(RoutesNoAuth)
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
