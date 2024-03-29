import React, { useState } from 'react'
import { Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import moment from 'moment';
import "moment/locale/es-mx";
import BasicModal from '../../Modal/BasicModal';

export default function Order(props) {
    const { order } = props;
    const { product ,totalPayment, createdAt, addressShipping, _id } = order;
    const { title, poster, url } = product;
    const [showModal, setShowModal] = useState(false);


  return (  
    <>
        <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{ title }</h2>
              <p>{ totalPayment } $</p>
              <p>Pedido: { _id }</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <AddressModal showModal={showModal} setShowModal={setShowModal} addressShipping={addressShipping} title={title}/>
    </>
  ) 
}

function AddressModal(props){
    const { showModal, setShowModal, addressShipping, title} = props;

    return(
        <BasicModal
            show={showModal}
            setShow={setShowModal}
            size="tiny"
            title={title}
        >
            <h3>Dirección de envío del pedido</h3>
            <div>
                <p>{addressShipping.name}</p>
                <p>{addressShipping.address}</p>
                <p>{addressShipping.city}, {addressShipping.state}
                    {addressShipping.postalCode}
                </p>
                <p>{addressShipping.phone}</p>
            </div>
        </BasicModal>
    )
}