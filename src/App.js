import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';
import PageContent from './containers/PageContent';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))
const UserDetail = lazy(()=> import('./features/leads/components/UserDetail') )

// Initializing different libraries
initializeApp()


// Check for login and initialize axios
const token = checkAuth()


function App() {

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])


  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />
         
         

          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />}></Route>
{/*           
          <Route path="/app/drivers/:id/:firstname" element={<UserDetail />} /> */}
         
          <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/"} replace />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
