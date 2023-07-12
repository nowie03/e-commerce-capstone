import React,{useState,useEffect,useContext} from 'react'
//context
import { cartContext } from '../Context/CartContext'
//axios
import axios from 'axios';
//
import { useQuery } from '@tanstack/react-query';


const CartModal = () => {
    const cartId=useContext(cartContext);

    const fetchCartItems=async()=>{
        var response = await axios.get(`http://localhost:5000/ApiGateway/cart/cartItems?cartId=${cartId}`);
        return response;
    }

    //TODO: implement cart modal 


  return (
    <div>CartModal</div>
  )
}

export default CartModal