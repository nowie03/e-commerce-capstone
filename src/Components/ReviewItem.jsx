import React from "react";

import { Grid, Text, Image,Card } from "@nextui-org/react";

import axios from "axios";

import { useQuery } from "@tanstack/react-query";

const ReviewItem = ({ orderId }) => {
  const [order, setOrder] = React.useState();
  const [product, setProduct] = React.useState();

  const fetchOrder = async () => {
    var response = await axios.get(
      `http://localhost:5000/ApiGateway/order?orderId=${orderId}`,
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
    queryKey: [`order-review-item${orderId}`],
  });

  const fetchProductQuery = useQuery({
    queryFn: fetchProduct,
    queryKey: [`product-review-item-${orderId}`],
    enabled: !!order,
  });

  React.useEffect(() => {
    if (fetchOrderQuery.data) setOrder(fetchOrderQuery.data.data);
  }, [fetchOrderQuery.data]);

  React.useEffect(() => {
    if (fetchProductQuery.data) setProduct(fetchProductQuery.data.data);
  }, [fetchProductQuery.data]);

  return (
    <Card>
    <Grid.Container gap={5}>
      <Grid xs={3}>
        <Image showSkeleton
            height={50}
            width={50}
            src={product?.images[0].imageUrl}
         />
      </Grid>
      <Grid xs={6}>
        <Grid.Container>
          <Grid xs={12}>
            <Text h3>{product?.name}</Text>
          </Grid>
          <Grid xs={12}>
            <Text>{product?.description}</Text>
          </Grid>
        </Grid.Container>
      </Grid>
      <Grid xs={3}>
        <Grid.Container>
          <Grid xs={12}>
            <Text b> $ {product?.price}</Text>
          </Grid>
          <Grid xs={12}>
            <Text> nos {order?.quantity}</Text>
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
    </Card>
  );
};

export default ReviewItem;
