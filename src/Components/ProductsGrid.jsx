import React from 'react'
import { Grid } from '@nextui-org/react'
import ProductCard from './ProductCard'

const ProductsGrid = () => {
  return (
    <Grid.Container gap={5} justify="flex-start">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        
    </Grid.Container>
  )
}

export default ProductsGrid