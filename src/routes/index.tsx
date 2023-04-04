import { Route, Routes } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Customers from '../pages/Customers'
import New from '../pages/New'

function RoutesApp() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />

      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path='/customers'
        element={
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        }
      />

      <Route
        path='/profile'
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path='/newTicket'
        element={
          <PrivateRoute>
            <New />
          </PrivateRoute>
        }
      />

      <Route
        path='/newTicket/:id'
        element={
          <PrivateRoute>
            <New />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default RoutesApp;