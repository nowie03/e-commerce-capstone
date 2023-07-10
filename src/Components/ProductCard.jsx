import React from 'react'
import { Text, Grid ,Card,Row} from "@nextui-org/react"
import image from "../assets/demo1.jpg"
import "../css/ProductCard.css";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({id}) => {
    const navigate=useNavigate();
  return (
    <Grid xs={12} sm={3} key={1} onClick={
     ()=>navigate(`${id}`)  
    }>
    <Card isPressable className='card'>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={image}
          objectFit="cover"
          width="100%"
          height={140}
          alt={"title"}
        />
      </Card.Body>
      <Card.Footer css={{ justifyItems: "flex-start" }}>
        <Row wrap="wrap" justify="space-between" align="center">
          <Text b>{"title"}</Text>
          <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
            {"2.3$"}
          </Text>
        </Row>
      </Card.Footer>
    </Card>
  </Grid>
  )
}

export default ProductCard