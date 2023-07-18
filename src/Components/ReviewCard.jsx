import React from "react";
//next ui
import { Card, Text, User, Grid,Button, Loading } from "@nextui-org/react";
//material Ui
import  Rating  from "@mui/material/Rating";
//utils
import { getUserId } from "../Utils";
//react-query
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ReviewCard = ({review}) => {

  const [user,setUser]=React.useState();

  const fetchUser=async()=>{
    var response=await axios.get( `http://localhost:5000/ApiGateway/users?userId=${review.userId}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    return response;
  }

  const fetchUserQuery=useQuery({
    queryFn:fetchUser,
    queryKey:[`user-${review.userId}`]
  })

  React.useEffect(()=>{
    if(fetchUserQuery.data){
      setUser(fetchUserQuery.data.data)
    }
  },[fetchUserQuery.data])

  return (
    <Card isHoverable variant="bordered" className="m-2">
      <Card.Body>
       {fetchUserQuery.isLoading?<Loading/>: <Grid.Container>
          <Grid xs={10}>
            <User
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              name={user?.username}
              size="xs"
            />
          </Grid>
          <Grid xs={12}>
          <Rating name="read-only" value={review.rating} readOnly size="small"/>
            </Grid>
          <Grid xs={12}>
            <Text>{review.comment}</Text>
          </Grid>
        </Grid.Container>}
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
