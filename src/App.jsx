import React,{ useEffect, useState ,createContext} from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { cartContext } from './Context/CartContext'
import axios from 'axios'
import { getUserId } from './Utils'



function App() {

  const navigate=useNavigate();
 const token=localStorage.getItem('token')

 if(!token) {
  navigate("/login");
}


  const [cart,setCart]=useState();

  



  

  return (
    <cartContext.Provider value={
    {
      cart,
      setCart
    }
    }>
   <Navbar/>
   {<Outlet/>}
   </cartContext.Provider>
  )
}

export default App
