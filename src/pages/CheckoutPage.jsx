import React from "react";

//next ui
import { Grid, Text, Image, Badge, Button, Radio, Loading } from "@nextui-org/react";
//material ui
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useLocation,useBeforeUnload, useNavigate } from "react-router-dom";



//react-query
import { useMutation } from "@tanstack/react-query";
import ReviewItem from "../Components/ReviewItem";
import axios from "axios";


const CheckoutPage = () => {

    const params=useLocation();

    const navigate=useNavigate();


    const checkoutOrder=async(orderId)=>{
        var response=await axios.post(`http://localhost:5000/ApiGateway/order/checkout?orderId=${orderId}`,{},{
        headers: {
            Authorization: localStorage.getItem("token"),
          }
    });

        return response;
    }

    const checkoutOrderMutation=useMutation({
        mutationFn:checkoutOrder,
        onSuccess:data=>{console.log(data)}
    });

   const checkoutOrders=async()=>{
        params.state?.orders.forEach(orderId=>{
            checkoutOrderMutation.mutate(orderId);
        })

       
    }

    React.useEffect(()=>{
      if(checkoutOrderMutation.isSuccess)
        navigate('/products')
    },[checkoutOrderMutation.isSuccess])

   

  return (
    <Grid.Container gap={5} justify="center">
      <Grid xs={12} md={6}>
        <Grid.Container gap={5}>
          <Grid xs={12}>
            <Grid.Container>
              <Grid xs={12}>
                <Text h3>Review Item And Shopping</Text>
              </Grid>
              <Grid xs={12}>
               {params.state?.orders.map(id=>(
                <ReviewItem orderId={id}/>
                ))}
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid xs={12}>
            <Grid.Container gap={5}>
              <Grid xs={12}>
                <Grid.Container>
                  <Grid xs={8}>
                    <Text h3>Delivery Information</Text>
                  </Grid>
                  <Grid xs={4}>
                    <Text
                      css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                      }}
                    >
                      Choose an Address
                    </Text>
                    
                  </Grid>
                </Grid.Container>
              </Grid>
              <Grid xs={12}>
               
              </Grid>
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Grid>
      <Grid xs={12} md={6}>
        <Grid.Container gap={5}>
          <Grid xs={12}>
            <Text h3>Order Summary</Text>
          </Grid>
          <Grid xs={12}>
            <Text h4>Payment Details</Text>
          </Grid>
          <Grid xs={12}>
            <Radio.Group label="Options" defaultValue="A">
              <Radio value="A">cash on delivery</Radio>
              <Radio value="B">Gift Card</Radio>
              <Radio value="C">UPI</Radio>
              <Radio value="D">Credit or Debit Card</Radio>
            </Radio.Group>
          </Grid>
          <Grid xs={12}>
            <Button size="md" color="success" onPress={()=>{
                checkoutOrders();
            }}>
             {checkoutOrderMutation.isLoading?<Loading/>:<Text>Pay</Text>}
            </Button>
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
};

export default CheckoutPage;
