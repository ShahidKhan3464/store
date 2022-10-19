import React from 'react'
import { BsStarFill } from 'react-icons/bs'
import { useGlobalContext } from '../../contextApi/Context';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import productImg from '../../assets/images/shoe.png'
import './product.css'

const Product = ({ id, name, price, quantity, img }) => {
    const { addItemToCart } = useGlobalContext()

    const addToCart = (id, name, price, quantity, img) => {
        const item = { id, name, price, quantity, img }
        addItemToCart(item)
    }

    return (
        <article className='Product'>
            <Card>
                <div className="product-img">
                    <Card.Img variant="top" src={productImg} />
                </div>
                <Card.Body>
                    <Card.Title>
                        <h5> {name} </h5>
                        <h6> ${price} </h6>
                    </Card.Title>
                    <div className='rating'>
                        {[...Array(5)].map((x, i) => <BsStarFill key={i} style={{ color: 'orange' }} />)}
                    </div>
                    <Button variant="success" onClick={() => addToCart(id, name, price, quantity, img)}>Add to Cart</Button>
                </Card.Body>
            </Card>
        </article>
    )
}

export default Product