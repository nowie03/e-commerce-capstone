import React from "react";

import {  Modal ,useInput,Textarea,Grid,Text, Loading,Button} from "@nextui-org/react";

import  Rating  from "@mui/material/Rating";

import { useMutation,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getUserId } from "../Utils";


const ReviewModal = ({visible,setVisible,closeHandler,productId}) => {

    const queryClient=useQueryClient();
 
    const[value,setValue] = React.useState("Good Product");
    const[rating,setRating] = React.useState(0);

  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput("Good Product");

  const postComment=async(comment)=>{
    var response = await axios.post(`http://localhost:5000/ApiGateway/reviews`,comment,{
    headers:{
        Authorization: localStorage.getItem('token'),
      }
    })
    return response;
    }

    //mutations
    const reviewMutation=useMutation({
        mutationFn:postComment,
        onSuccess:data=>{
            console.log(data);
            queryClient.invalidateQueries(`product-review-${productId}`)
            setVisible(false);
        }
    })

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text h3>Add Your Review</Text>
      </Modal.Header>
      {
      reviewMutation.isLoading?<Loading/>:<Modal.Body>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <Textarea
      {...bindings}
    label="Write your thoughts"
    placeholder="Enter your amazing ideas."
  />
    </Modal.Body>
      }
      <Modal.Footer>
        <Button   color="success"
              auto
              disabled={reviewMutation.isLoading}
              onPress={() => {
                reviewMutation.mutate({
                    productId: productId,
                    userId: getUserId(),
                    comment: value,
                    rating: rating,
                    createdAt: "2023-07-16T17:13:38.786Z"
                    });
              }}>
                Add Review
              </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
