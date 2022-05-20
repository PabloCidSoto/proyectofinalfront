import React from 'react'
import Head from 'next/head'

export default function Seo(props) {
    const { title, description } = props
  return (
    <Head>
        <title>{title}</title>
        <meta property='description' content={description} />
    </Head>
  )
}

Seo.defaultProps = {
    title: "Tienda de cosas otakus",
    description: "Consigue todo lo que necesites relacionado al mundo de anime"
}