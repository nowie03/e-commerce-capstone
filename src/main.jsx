import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
//pages
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'


const router=createBrowserRouter([{
  path:"/login",
  element:<LoginPage/>
}
,{
  path:"/signup",
  element :<SignupPage/>
}]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
  </React.StrictMode>,
)
