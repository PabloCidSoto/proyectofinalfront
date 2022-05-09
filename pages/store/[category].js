import React from "react";
import { useRouter } from "next/router";
import BasicLayout from "../../layouts/BasicLayout";


export default function Category(){
    const { query } = useRouter();

    return(
        <BasicLayout className="category">
            <h1>Estamos en la Categoría: {query.category}</h1>
        </BasicLayout>
    )
}