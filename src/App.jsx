import React,{ useEffect, useState ,createContext} from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { cartContext } from './Context/CartContext'
import axios from 'axios'
import { getUserId } from './Utils'



function App() {
  const [cart,setCart]=useState();


  const fetchCart=async()=>{
    var response=await axios.get(
      `http://localhost:5000/ApiGateway/cart?userId=${getUserId()}`,{
      headers:{
        Authorization: localStorage.getItem('token'),
      }
    });
    return response;
  }

  const cartQuery=useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
  })

  useEffect(()=>{
    if(cartQuery.data){
      setCart(cartQuery.data.data.id)
    }
    // console.log(cartQuery.data)
  },[cartQuery.data])
  
  if(cartQuery.isLoading){
    return <p>going through our inventory to impress you ...</p>
  }

  if(cartQuery.isError){
    return <p>error when going through our inventory try again in few mins...</p>
  }

 



  

  return (
    <cartContext.Provider value={cart}>
   <Navbar/>
   {<Outlet/>}
   </cartContext.Provider>
  )
}

export default App
