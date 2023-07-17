import React from "react";

//next ui
import { Grid, Text, Image, Badge, Button, Radio } from "@nextui-org/react";
//material ui
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";


const CheckoutPage = () => {
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
                <Grid.Container gap={5}>
                  <Grid xs={3}>
                    <Image showSkeleton />
                  </Grid>
                  <Grid xs={6}>
                    <Grid.Container>
                      <Grid xs={12}>
                        <Text h3>Product Name</Text>
                      </Grid>
                      <Grid xs={12}>
                        <Text>description</Text>
                      </Grid>
                    </Grid.Container>
                  </Grid>
                  <Grid xs={3}>
                    <Grid.Container>
                      <Grid xs={12}>
                        <Text b>price</Text>
                      </Grid>
                      <Grid xs={12}>
                        <Text>quantity</Text>
                      </Grid>
                    </Grid.Container>
                  </Grid>
                </Grid.Container>
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
                <p>address1</p>
                <p>address1</p>
                <p>address1</p>
                <p>address1</p>
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
            <Button size="md" color="success">
              Pay
            </Button>
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
};

export default CheckoutPage;
