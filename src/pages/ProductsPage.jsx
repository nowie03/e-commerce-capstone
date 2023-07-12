import React ,{useEffect, useState} from 'react'
import { Grid } from '@nextui-org/react'
import ProductCard from "../Components/ProductCard"
import CategoriesDropdown from '../Components/CategoriesDropdown'

//react query
import { useQuery } from '@tanstack/react-query'
//axios
import axios from 'axios'



const ProductsPage = () => {

  //states
  const [limit,setLimit]=useState(10);
  const [skip,setSkip] = useState(0);


  //query functions
 

  const fetchProducts=async()=>{
    var response=await 
    axios.get(`http://localhost:5000/ApiGateway/products?limit=${limit}&skip=${skip}`,{
    headers:{
      Authorization: localStorage.getItem('token'),
    }})
    return response
    
    
  }

  //queries
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })





 

  if(productsQuery.isLoading) {
    return <p>...loading</p>
  }

  if(productsQuery.isError) {
    <p>error</p>
  }


  return (
    <Grid.Container gap={5} justify="flex-start">
        {/* <Grid xs={12}>
            <CategoriesDropdown/>
            
        </Grid> */}
        
       {productsQuery.data.data.map(item=>(
        <ProductCard product={item} />)) 
        }
    </Grid.Container>
  
  )
}

export default ProductsPage