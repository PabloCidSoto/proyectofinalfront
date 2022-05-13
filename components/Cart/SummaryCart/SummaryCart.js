import React, { useState, useEffect } from 'react'
import { Table, Image, Icon } from 'semantic-ui-react';
import { forEach, map } from 'lodash';
import useCart from '../../../hooks/useCart';

export default function SummaryCart(props) {
    const { products, reloadCart, setReloadCart } = props;
    const [totalPrice, setTotalPrice] = useState(0);
    const { removeProductCart } = useCart();

    useEffect(() => {
      let price = 0;
      forEach(products, (product)=>{
          console.log(price)
          price += (product.price - Math.floor(product.price * product.discount) / 100);
      })
      setTotalPrice(price)
    }, [reloadCart, products])

    const removeProduct = (product) => {
        removeProductCart(product);
        setReloadCart(true);
    }
    
  return (
    <div className='summary-cart'>
        <div className='title'>
            Carrito
        </div>
        <div className='data'>
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Producto</Table.HeaderCell>
                        <Table.HeaderCell>Categoría</Table.HeaderCell>
                        <Table.HeaderCell>Entrega</Table.HeaderCell>
                        <Table.HeaderCell>Precio</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {map(products, (product)=> (
                        <Table.Row key={product.id} className="summary-cart__product">
                            <Table.Cell>
                                <Icon name='close' link onClick={() => removeProduct(product.url)}/>
                                <Image src={product.poster.url} alt={product.title}/>
                                {product.title}
                            </Table.Cell>
                            <Table.Cell>
                                {product.category.category}
                            </Table.Cell>
                            <Table.Cell>
                                3 - 5 días hábiles
                            </Table.Cell>
                            <Table.Cell>
                                {(product.price - Math.floor(product.price * product.discount) / 100).toFixed(2)}$
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    <Table.Row className="summary-cart__resume">
                        <Table.Cell className="clear"/>
                        <Table.Cell colSpan="2">Total</Table.Cell>
                        <Table.Cell className="total-price">{totalPrice.toFixed(2)}$</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    </div>
  )
}
