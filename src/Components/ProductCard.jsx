import React from "react";
// import { Text, Grid ,Card,Row} from "@nextui-org/react"
import image from "../assets/demo1.jpg";
import "../css/ProductCard.css";
import { useNavigate } from "react-router-dom";

// const ProductCard = ({id}) => {
//     const navigate=useNavigate();
//   return (
//     <Grid xs={12} sm={3} key={1} onClick={
//      ()=>navigate(`${id}`)
//     }>
//     <Card isPressable className='card'>
//       <Card.Body css={{ p: 0 }}>
//         <Card.Image
//           src={image}
//           objectFit="cover"
//           width="100%"
//           height={140}
//           alt={"title"}
//         />
//       </Card.Body>
//       <Card.Footer css={{ justifyItems: "flex-start" }}>
//         <Row wrap="wrap" justify="space-between" align="center">
//           <Text b>{"title"}</Text>
//           <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
//             {"2.3$"}
//           </Text>
//         </Row>
//       </Card.Footer>
//     </Card>
//   </Grid>
//   )
// }

// export default ProductCard

import { Card, Col, Row, Button, Text, Grid } from "@nextui-org/react";

const ProductCard = ({product}) => {
  const navigate = useNavigate();
  return (
    <Grid xs={12} sm={6} md={3} key={product.id}>
      <Card isHoverable>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
              New
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={product.images[0].imageUrl}
            showSkeleton
            objectFit="cover"
            alt="Card example background"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#ffffff66",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Text color="#000" size="md">
               {product.name}
              </Text>
            </Col>
            <Col>
              <Row justify="flex-end">
                <Button flat auto rounded color="secondary" onPress={() => navigate(`${product.id}`)}>
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                 {product.price}
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default ProductCard;
