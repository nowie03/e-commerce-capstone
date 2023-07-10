import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
//pages
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
//react-query
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';

const router=createBrowserRouter([{
  path:"/login",
  element:<LoginPage/>
}
,{
  path:"/signup",
  element :<SignupPage/>
}]);

const queryClient=new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
    <NextUIProvider>
      <App/>
  </NextUIProvider>
    </RouterProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
