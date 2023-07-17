import React,{useState,useEffect,useContext} from 'react'
//context
import { cartContext } from '../Context/CartContext'
//axios
import axios from 'axios';
//react query
import { useQuery } from '@tanstack/react-query';
//next ut
import { Button, Grid, Loading, Modal ,Text} from '@nextui-org/react';
import { getUserId } from '../Utils';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';




const CartModal = ({visible,handler,closeHandler}) => {

  const navigate=useNavigate();
  const {cart,setCart}=React.useContext(cartContext);


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

 
  React.useEffect(()=>{
    if(cartQuery.data){
     console.log(cartQuery.data);
     setCart(cartQuery.data.data)
    }
    // console.log(cartQuery.data)
  },[cartQuery.data])


    const fetchCartItems=async()=>{
        var response = await axios.get(`http://localhost:5000/ApiGateway/cart/cartItems?cartId=${cart.id}`,{
        headers:{
          Authorization: localStorage.getItem('token'),
        }});
        return response;
    }

    const cartItemsQuery=useQuery({
      queryFn:fetchCartItems,
      queryKey:`cart-items`,
      enabled:!!cart 

      })

      React.useEffect(()=>{
        if(cartItemsQuery.data){
         console.log(cartItemsQuery.data);
        // setCart(cartItemsQuery.data.data)
        }
        // console.log(cartItemsQuery.data)
      },[cartItemsQuery.data])

    //TODO: implement cart modal 


  return (
    <Modal
    open={visible}
    scroll
    onClose={closeHandler}
    >
      <Modal.Header >
        <Text h3>Cart</Text>
      </Modal.Header>
      <Modal.Body>
        {cartItemsQuery.isLoading?<Loading/>:
          cartItemsQuery.data?.data.map(cartItem=>(
           <CartItem cart={cartItem}/>)
          )}
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={4} >
            <Grid xs={12} md={6}>
          <Button flat color='success' size="sm" onPress={()=>{
            navigate('/checkout')
          }}>
            Checkout
          </Button>
          </Grid>
          <Grid xs={12} md={6}>
          <Button size="sm" flat color='error' onPress={closeHandler}>
            Cancel
          </Button>
          </Grid>
          </Grid.Container>
        </Modal.Footer>
    </Modal>
  )
}

export default CartModal