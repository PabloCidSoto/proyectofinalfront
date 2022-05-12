import React, { useState, useEffect } from 'react'
import { size, forEach } from 'lodash'
import { Loader } from 'semantic-ui-react'
import BasicLayout from "../layouts/BasicLayout"
import { getFavoriteApi } from '../api/favorite'
import useAuth from '../hooks/useAuth'
import ListProducts from "../components/ListProducts"
import Pagination from '../components/Pagination'

export default function Wishlist() {
    const [products, setProducts] = useState(null);
    const { auth, logout } = useAuth();
    const limitPerPage = 20;


    useEffect(() => {
      (async () => {
          const response = await getFavoriteApi(auth.idUser, logout);
          if(size(response)>0){
              const producList = [];
              forEach(response, (data)=>{
                  producList.push(data.product)
              })
              setProducts(producList);
          }else{
              setProducts([])
          }
      })()
    }, [])
    

  return (
    <BasicLayout className="wishlist">
        <div className='wishlist__block'>
            <div className='title'>Lista de deseos</div>
            <div className='data'>
                {!products && <Loader active>Cargando productos</Loader>}
                {products && size(products) === 0 &&(
                    <div className='data__not-found'>
                        <h3>No hay productos por el momento en tu lista de deseos</h3>
                    </div>
                )}
                {size(products) > 0 &&(
                    <ListProducts products={products}/>
                )}

                {/*totalProducts ? (<Pagination totalProducts={totalProducts} page={query.page ? parseInt(query.page) : 1} limitPerPage={limitPerPage}/>) : null*/}
            </div>
        </div>
    </BasicLayout>
  )
}
