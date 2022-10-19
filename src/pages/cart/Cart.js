import React, { useState } from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { useGlobalContext } from '../../contextApi/Context'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Header from '../../components/header/Header'
import productImg from '../../assets/images/shoe.png'
import './cart.css'

const Cart = () => {
    const navigate = useNavigate()
    const { cartItems, increase, decrease, remove } = useGlobalContext()

    const proceedToCheckOut = () => {
        if (!localStorage.getItem('token')) {
            navigate("/signIn", { state: 'To order the product you need to be login first!!!' })
            return
        }
        navigate("/placeOrder")
    }

    if (cartItems.length === 0) {
        return (
            <>
                <Header />
                <div className='Cart'>
                    <h2>your cart</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                </div>
            </>
        )
    }

    return (
        <React.Fragment>
            <Header />
            <section className='Cart'>
                <h2>your cart</h2>
                {cartItems.map((item, index) =>
                    <article key={index} className="cart-item">
                        <div className="item-img">
                            <img src={productImg} alt="shoes" />
                        </div>
                        <div className='item-details'>
                            <h5>{item.name}</h5>
                            <h6 className='item-price'>${item.price}</h6>
                            <button className='remove-btn' onClick={() => remove(item.id)}>remove</button>
                        </div>
                        <div className='item-quantity'>
                            <button className='quantity-btn' onClick={() => increase(item.id)}><IoIosArrowUp /></button>
                            <span>{item.quantity}</span>
                            <button className='quantity-btn' onClick={() => decrease(item.id)}><IoIosArrowDown /></button>
                        </div>
                    </article>
                )}
                <div className='cart-total'>
                    <h4>
                        total
                        <span>
                            ${cartItems.reduce((total, item) => total += item.price * item.quantity, 0)}.00
                        </span>
                    </h4>
                </div>
                <Button variant='success' className='checkoutBtn' onClick={() => proceedToCheckOut()}>proceed to checkout</Button>
            </section>
        </React.Fragment>
    )
}

export default Cart