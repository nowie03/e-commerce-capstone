import React from "react";
//next ui
import { Card, Text, User, Grid,Button } from "@nextui-org/react";
//material Ui
import  Rating  from "@mui/material/Rating";
import { getUserId } from "../Utils";

const ReviewCard = ({review}) => {

  return (
    <Card isHoverable variant="bordered" className="m-2">
      <Card.Body>
        <Grid.Container>
          <Grid xs={10}>
            <User
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              name={review.userId}
              size="xs"
            />
          </Grid>
          <Grid xs={12}>
          <Rating name="read-only" value={review.rating} readOnly size="small"/>
            </Grid>
          <Grid xs={12}>
            <Text>{review.comment}</Text>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
