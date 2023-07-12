import React, { useState,useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import image from "../assets/demo1.jpg";
import { Image, Text, Button, Card } from "@nextui-org/react";

import "../css/ProductPage.css";
import ProductPageCard from "../Components/ProductPageCard";
//axios
import axios from "axios";
//react-query
import { useQuery } from '@tanstack/react-query'
//context
import { cartContext } from "../Context/CartContext";




const ProductPage = () => {
  //cart context is set in app.jsx
  const cartId=useContext(cartContext);
  
  const {productId} = useParams();
  const [quantity, setQuantity] = useState(1);
 


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

  //queries
  const productQuery = useQuery({
    queryKey: [`product-${productId}`, ],
    queryFn: fetchProduct,
  })

  

  

  if(productQuery.isLoading) {
    return <p>loading...</p>
  }

  if(productQuery.isError){
    return <p>error...</p>
  }

  
  

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12 col-lg-6 image-container mb-3">
          <ProductPageCard image={productQuery.data.data.images[0].imageUrl} />
          <div className="row mt-4">
            <div className="col">
              {" "}
              <ProductPageCard image={productQuery.data.data.images[1].imageUrl} />
            </div>
            <div className="col">
              {" "}
              <ProductPageCard image={productQuery.data.data.images[2].imageUrl} />
            </div>
            <div className="col">
              {" "}
              <ProductPageCard image={productQuery.data.data.images[3].imageUrl} />
            </div>
            <div className="col">
              {" "}
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
              {" "}
              <Button flat color="error" auto onPress={handleDecrement}>
                -
              </Button>
            </div>
            <div className="col-4">
              {" "}
              <Button shadow auto>
                {quantity}
              </Button>
            </div>
            <div className="col-4">
              {" "}
              <Button flat color="success" auto onPress={handleIncrement}>
                +
              </Button>
            </div>
          </div>
          <div className="row w-75 border-bottom p-3 mb-4">
            <div className="col-12 col-lg-6 mb-2">
              <Button shadow color="secondary" auto rounded>
                Buy Now
              </Button>
            </div>
            <div className="col-12 col-lg-6 ">
              <Button shadow color="warning" auto rounded>
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
