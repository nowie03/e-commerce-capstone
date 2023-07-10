import React, { useState } from "react";
import { useParams } from "react-router-dom";
import image from "../assets/demo1.jpg";
import { Image, Text, Button } from "@nextui-org/react";

import "../css/ProductPage.css";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity+1);
}
  const handleDecrement = () => {
    if(quantity==1){
        return ;
    }
    setQuantity(quantity-1);
}

  const urlParams = useParams();
  return (
    <div className="p-2">
      <div className="row mb-3">
        <Text> {`products / ${urlParams.productId}`}</Text>
      </div>
      <div className="row ">
        <div className="col-12 col-lg-6 image-container">
          <div className="row">
            <Image src={image} alt="Default Image" objectFit="cover" />
          </div>
          <div className="row mt-4">
            <div className="col">
              {" "}
              <Image src={image} alt="Default Image" objectFit="cover" />
            </div>
            <div className="col">
              {" "}
              <Image src={image} alt="Default Image" objectFit="cover" />
            </div>
            <div className="col">
              {" "}
              <Image src={image} alt="Default Image" objectFit="cover" />
            </div>
            <div className="col">
              {" "}
              <Image src={image} alt="Default Image" objectFit="cover" />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 info-container">
          <div className="row w-75  p-2">
            <Text h2 b>
              {"Airpods-Max"}
            </Text>
          </div>
          <div className="row w-75 border-bottom p-2 mb-4">
            <Text size="$xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis{" "}
            </Text>
          </div>
          <div className="row w-75 border-bottom p-3 mb-4">
            <Text h3 b>
              {"$ 2.3"}
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
