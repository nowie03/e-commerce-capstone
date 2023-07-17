import React from "react";
//react query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//axios
import axios from "axios";
//next ui
import { Card, Image, Text, Grid, Loading, Button } from "@nextui-org/react";

//material ui
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const CartItem = ({ cart }) => {
  const [order, setOrder] = React.useState();
  const [product, setProduct] = React.useState();

  const queryClient = useQueryClient();

  //get order information
  const fetchOrder = async () => {
    var response = await axios.get(
      `http://localhost:5000/ApiGateway/order?orderId=${cart.orderId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response;
  };

  const fetchProduct = async () => {
    var response = await axios.get(
      `http://localhost:5000/ApiGateway/product?id=${order.produdtId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response;
  };

  const fetchOrderQuery = useQuery({
    queryFn: fetchOrder,
    queryKey: [`order-${cart.orderId}`],
  });

  const fetchProductQuery = useQuery({
    queryFn: fetchProduct,
    queryKey: [`product-cart-item-${cart.id}`],
    enabled: !!order,
  });

  //delete item from cart
  const deleteCartItem = async () => {
    var response = await axios.delete(
      `http://localhost:5000/ApiGateway/carts?cartItemId=${cart.id}&orderId=${order.id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    return response;
  };

  const deleteCartMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("cart-items");
    },
  });

  React.useEffect(() => {
    if (fetchOrderQuery.data) setOrder(fetchOrderQuery.data.data);
  }, [fetchOrderQuery.data]);

  React.useEffect(() => {
    if (fetchProductQuery.data) {
      console.log(fetchProductQuery.data.data);
      setProduct(fetchProductQuery.data.data);
    }
  }, [fetchProductQuery.data]);

  return (
    <Card>
      <Card.Body>
        {fetchProductQuery.isLoading ? (
          <Loading />
        ) : (
          <Grid.Container>
            <Grid xs={3}>
              <Image
                src={product?.images[0].imageUrl}
                alt="Default Image"
                width={50}
                height={50}
              />
            </Grid>
            <Grid xs={7}>
              <Grid.Container>
                <Grid xs={12}>
                  <Text b>{product?.name}</Text>
                </Grid>
                <Grid xs={12}>
                  <Text>nos : {order?.quantity}</Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={2}>
              <IconButton aria-label="delete" onClick={()=>{
                    deleteCartMutation.mutate();        
                }}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid.Container>
        )}
      </Card.Body>
    </Card>
  );
};

export default CartItem;
