import React, { useState } from 'react';
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick"
import  { map, size } from "lodash"


export default function CarouselImages(props) {
    const { title, images } = props;
    const [showModal, setShowModal] = useState(false);
    const [urlImage, setUrlImage] = useState(null)

    const openImage = (url) => {
        setUrlImage(url)
        setShowModal(true)
    }

    const slidesToShow = () => {
        switch (true) {
            case size(images) > 4:
                return 5
            case size(images) > 3:
                return 3
            case size(images) > 1:
                return 2
            case size(images) > 0:
                return 1
            default:
                return 0
        }
    }
    
    const settings = {
        className: "carousel-images",
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow(),
        swipeToSlider : true
    }
  return (
    (size(images) !== 0)?
        <>        
            <Slider {...settings}>
                {map(images, (image) =>(
                    <Image 
                        key={image.id}
                        src={image.url}
                        alt={image.name}
                        onClick={() => openImage(image.url)}
                    />
                ))}
            </Slider>
            <Modal open={showModal} onClose={() => setShowModal(false)} size="mini">
                <Image src={urlImage} alt={title}/>
            </Modal>
        </>
    :(<h3>Este producto no cuenta con imagenes adicionales</h3>)
  )
}   
