import React, { useState,useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image from "../assets/demo1.jpg";
import { Image, Text, Button, Grid, Spacer } from "@nextui-org/react";

import "../css/ProductPage.css";
import ProductPageCard from "../Components/ProductPageCard";
//axios
import axios from "axios";
//react-query
import { useQuery ,useMutation ,QueryClient, useQueryClient} from '@tanstack/react-query'
//context
import { cartContext } from "../Context/CartContext";
import ReviewCard from "../Components/ReviewCard";
import ReviewModal from "../Components/ReviewModal";
import { getUserId } from "../Utils";




const ProductPage = () => {

  const navigate=useNavigate();
  //cart context is set in app.jsx
  const {cart,setCart}=useContext(cartContext);

  //get queryClient
  const queryClient =useQueryClient();
  
  const {productId} = useParams();
  const [quantity, setQuantity] = useState(1);

  const [visible, setVisible] = React.useState(false);



  const handler = () => setVisible(true);
  
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity == 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  //fetch functions
  const fetchProduct=async()=>{
    var response=await axios.get(`http://localhost:5000/ApiGateway/product?id=${productId}`,{
    headers:{
      Authorization: localStorage.getItem('token'),
    }
  })
    return response
  }

  const fetchProductReviews=async()=>{
    var response=await axios.get(`http://localhost:5000/ApiGateway/reviews?productId=${productId}`,{
    headers:{
      Authorization: localStorage.getItem('token'),
    }
  })
  return response;
  }

  

  //queries
  const productQuery = useQuery({
    queryKey: [`product-${productId}`, ],
    queryFn: fetchProduct,
  })

  const productReviewsQuery=useQuery({
    queryKey:[`product-review-${productId}`],
    queryFn: fetchProductReviews
  })

  //post functions
  const postOrder=async(order)=>{
    var response=await axios.post(`http://localhost:5000/ApiGateway/orders`,order,{headers:{
    Authorization: localStorage.getItem('token'),
  }});
  return response;
  }

  const postCartItem=async(cartItem)=>{
    var response=await axios.post(`http://localhost:5000/ApiGateway/cart`,cartItem,{headers:{
    Authorization: localStorage.getItem('token'),
  }});
  return response;
  }

  //mutations
  const cartItemMutation=useMutation({
    mutationFn:postCartItem,
    onSuccess:data=>{
      queryClient.invalidateQueries('cart-items');
    }
    
  }) 



  const orderMutation=useMutation({
    mutationFn:postOrder,
    onSuccess:data=>{
      console.log('order made ');
      console.log(data);
      cartItemMutation.mutate({
      orderId:data.data.id,
      cartId:cart.id,
      createdAt:new Date(),
      })
    }
    })




  if(productQuery.isLoading) {
    return <p>loading...</p>
  }

  if(productQuery.isError){
    return <p>error...</p>
  }

  
  

  return (
    <div className="container">
      <ReviewModal visible={visible} setVisible={setVisible} closeHandler={closeHandler} productId={productId}/>
      <Grid.Container className=" mt-4">
        <div className="col-12 col-lg-6 image-container mb-3">
          <ProductPageCard image={productQuery.data.data.images[0].imageUrl} />
          <div className="row mt-4">
            <div className="col">
              <ProductPageCard image={productQuery.data.data.images[1].imageUrl} />
            </div>
            <div className="col">
              <ProductPageCard image={productQuery.data.data.images[2].imageUrl} />
            </div>
            <div className="col">
              <ProductPageCard image={productQuery.data.data.images[3].imageUrl} />
            </div>
            <div className="col">
              <ProductPageCard image={productQuery.data.data.images[4].imageUrl} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 info-container">
          <div className="row w-75  p-2">
            <Text h2 b>
              {productQuery.data.data.name}
            </Text>
          </div>
          <div className="row w-75 border-bottom p-2 mb-4">
            <Text size="$xs">
              {productQuery.data.data.description}
            </Text>
          </div>
          <div className="row w-75 border-bottom p-3 mb-4">
            <Text h3 b>
              {productQuery.data.data.price +" $"}
            </Text>
            <Text size="$xs">Limited offer </Text>
          </div>
          <div className="row w-75 p-3 mb-4">
            <div className="col-4">
              <Button flat color="error" auto onPress={handleDecrement}>
                -
              </Button>
            </div>
            <div className="col-4">
              <Button shadow auto>
                {quantity}
              </Button>
            </div>
            <div className="col-4">
              <Button flat color="success" auto onPress={handleIncrement}>
                +
              </Button>
            </div>
          </div>
          <div className="row w-75 border-bottom p-3 mb-4">
            <div className="col-12 col-lg-6 mb-2">
              <Button shadow color="secondary" auto rounded onPress={()=>{
                navigate("/checkout")
              }}>
                Buy Now
              </Button>
            </div>
            <div className="col-12 col-lg-6 ">
              <Button shadow color="warning" auto rounded onPress={()=>{
                orderMutation.mutate({
                produdtId:productId,
                quantity:quantity,
                userId:getUserId(),
                })
              }}>
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </Grid.Container>
      <Grid.Container>
      <Grid xs={12}className=" row mt-3">
        <Grid.Container>
        <Grid xs={12} md={10}>
        <Text h2>Reviews</Text>
        </Grid>
        <Grid xs={12} md={2}>
        <Button flat color="error" auto onPress={handler}>
          Add Review
          </Button>
        </Grid>
        </Grid.Container>
      </Grid>
      <Grid xs={12} className=" reviews-section row mt-1">
        {productReviewsQuery.isLoading?<p>loading reviews...</p>:
          productReviewsQuery.data.data.map(review=>(
            <ReviewCard review={review}/>
            ))
          }
      </Grid>
      </Grid.Container>
      <Spacer y={5}/>
    </div>
  );
};

export default ProductPage;
