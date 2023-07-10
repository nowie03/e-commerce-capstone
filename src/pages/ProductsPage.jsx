import React from 'react'
import { Grid } from '@nextui-org/react'
import ProductCard from "../Components/ProductCard"


const ProductsPage = () => {

    const items=[1,2,3,4,5,6,7,8,9,10,11,12]

  return (
    <Grid.Container gap={5} justify="flex-start">
       {items.map(item=>(
        <ProductCard id={item}/>)) 
        }
    </Grid.Container>
  
  )
}

export default ProductsPage