import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BasicLayout from "../layouts/BasicLayout"
import { getProductByUrlApi } from '../api/product';
import HeaderProduct from '../components/Product/HeaderProduct';
import TabsProduct from '../components/Product/TabsProduct';
import { Loader } from 'semantic-ui-react';

export default function Product() {
  const [product, setProduct] = useState(null);
  const { query } = useRouter();
  
  useEffect(() => {
    (async () => {
      const response = await getProductByUrlApi(query.product);
      setProduct(response);
    })()
  }, [query])

  if(!product) return (
    <BasicLayout>
      <Loader active>Cargando Producto</Loader>
    </BasicLayout> 
  );
  

  return (
    <BasicLayout className="product">
      <HeaderProduct product={product}/>
      <TabsProduct product={product}/>
      
    </BasicLayout>
  )
}
