import React from 'react'
import { Card } from '@nextui-org/react'

const ProductPageCard = ({image}) => {
  return (
    <Card className="row">
            <Card.Body css={{ p: 0 }}>
            <Card.Image src={image} alt="Default Image" objectFit="cover" />
            </Card.Body>
          </Card>
  )
}

export default ProductPageCard