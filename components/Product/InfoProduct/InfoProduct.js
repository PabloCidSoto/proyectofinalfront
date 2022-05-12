import React from 'react'
import ReactPlayer from "react-player/lazy";
import CarouselImages from '../CarouselImages';
import { Grid, GridColumn } from 'semantic-ui-react';
import moment from "moment"
import "moment/locale/es-mx"

export default function InfoProduct(props) {
    const { product } = props
  return (
    <div className='info-product'>
        <ReactPlayer className="info-product__video" url={product.video} controls={true}/>
        <Grid>
            <GridColumn mobile={16} tablet={8} computer={8}>
                <CarouselImages title={product.title} images={product.images} />

            </GridColumn>
            <GridColumn mobile={16} tablet={8} computer={8}>
                
                <div className='info-product__content'>
                    <div dangerouslySetInnerHTML={{__html: product.summary}}/>
                    <div className='info-product__content-date'>
                        <h4>Fecha de lanzamiento</h4>
                        <p>{moment(product.releaseDate).format("LL")}</p>
                    </div>
                </div>

            </GridColumn>
        </Grid>
    </div>
  )
}
