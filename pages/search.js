import React, { useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react';
import { size } from 'lodash';
import { useRouter } from 'next/router';
import BasicLayout  from "../layouts/BasicLayout"
import { searchProductsApi } from '../api/product';
import ListProducts from "../components/ListProducts";

export default function Search() {

    const [products, setProducts] = useState(null);
    const { query } = useRouter();
    

    useEffect(() => {
      document.getElementById("search-product").focus();
    }, []);

    useEffect(() => {
      (async () => {
          if(size(query.query) > 0){
            const response = await searchProductsApi(query.query);
            console.log(response)
            if(size(response) > 0) setProducts(response);
            else setProducts([]);
          }else{
              setProducts([]);
          }
      })()
    }, [query])
    
    

  return (
    <BasicLayout className="search">
        {!products && <Loader active>Buscando productos</Loader>}
        {products && size(products) === 0 && (
            <div>
                <h3>No se han encontrado juegos</h3>
            </div>
        )}
        {size(products) > 0 && <ListProducts products={products}/>}
    </BasicLayout>
  )
}
