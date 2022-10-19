import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import Loader from '../loader/Loader'
import Product from '../product/Product'
import './products.css'

const Products = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(null)

    const getProducts = async () => {
        setLoading(true)
        const { data } = await axios.get('http://localhost:4000/products')
        setProducts(data)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Container>
            <section className='Products'>
                {loading ?
                    <Loader />
                    : products?.map(product => (
                        <Product
                            id={product.id}
                            key={product.id}
                            img={product.img}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity}
                        />
                    ))}
            </section>
        </Container>
    )
}

export default Products