import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from '../../../hooks/useAuth';
import { createAddressApi, updateAddressApi } from '../../../api/address';
import { toast } from 'react-toastify';
import { add } from 'lodash';

export default function AddressForm(props) {
    const { setShowModal, setReloadAddresses, newAddress, address } = props;
    const [loading, setLoading] = useState(false);
    const { auth, logout } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: Yup.object(validationSchema()),
        onSubmit:(formData) => {
            //createAddress(formData);
            newAddress ? createAddress(formData) : updateAddress(formData);
        }
    });

    const createAddress = async (formData)=>{
        setLoading(true);
        const formDataTemp = {
            ...formData,
            user: auth.idUser
        };
        const response = await createAddressApi(formDataTemp, logout)
        if(!response){
            toast.warning("Error al crear la dirección")
            setLoading(false);
        }else{
            formik.resetForm();
            setReloadAddresses(true);
            setLoading(false);
            setShowModal(false);
        }
    }

    const updateAddress = (formData) => {
        setLoading(true);
        const formDataTemp = {
            ...formData,
            user: auth.idUser
        };
        const response = updateAddressApi( address._id, formDataTemp, logout);

        if(!response){
            toast.warning("Error al actualizar la dirección");
            setLoading(false)
        }else {
            formik.resetForm();
            setReloadAddresses(true);
            setLoading(false);
            setShowModal(false);
        }
    }

  return (
    <Form onSubmit={formik.handleSubmit}>
        <Form.Input 
            name="title"
            type="Text"
            label="Título de la dirección"
            placeholder="Título de la dirección"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
        />

        <Form.Group widths="equal">
            <Form.Input 
                name="name"
                type="text"
                label="Nombre y apellidos"
                placeholder="Nombre y apellidos"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
            />
            <Form.Input 
                name="address"
                type="text"
                label="Dirección"
                placeholder="Dirección"
                onChange={formik.handleChange}
                value={formik.values.address}
                error={formik.errors.address}
            />
        </Form.Group>

        <Form.Group widths="equal">
            <Form.Input 
                name="city"
                type="text"
                label="Ciudad"
                placeholder="Ciudad"
                onChange={formik.handleChange}
                value={formik.values.city}
                error={formik.errors.city}
            />
            <Form.Input 
                name="state"
                type="text"
                label="Estado"
                placeholder="Estado"
                onChange={formik.handleChange}
                value={formik.values.state}
                error={formik.errors.state}
            />
        </Form.Group>

        <Form.Group widths="equal">
            <Form.Input 
                name="postalCode"
                type="text"
                label="Código Postal"
                placeholder="Código Postal"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                error={formik.errors.postalCode}
            />
            <Form.Input 
                name="phone"
                type="text"
                label="Número de teléfono"
                placeholder="Número de teléfono"
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={formik.errors.phone}
            />
        </Form.Group>

        <div className='actions'>
            <Button className='submit' type='submit' loading={loading}>
                {newAddress ? "Crear dirección" : "Actualizar dirección"}
            </Button>
        </div>
    </Form>
  );

    function initialValues(address){
        return {
            title: address?.title || "",
            name: address?.name || "",
            address: address?.address || "",
            city: address?.city || "",
            state: address?.state || "",
            postalCode: address?.postalCode || "",
            phone: address?.phone || ""
        }
    }

    function validationSchema(){
        return {
            title: Yup.string().required(true),
            name: Yup.string().required(true),
            address: Yup.string().required(true),
            city: Yup.string().required(true),
            state: Yup.string().required(true),
            postalCode: Yup.number().required(true).positive().integer(),
            phone: Yup.number().required(true).positive().integer()
        }
    }
}
