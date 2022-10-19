import React, { useState } from 'react'
import { useGlobalContext } from '../../contextApi/Context'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Header from '../../components/header/Header'
import Modal from '../../components/modal/Modal'
import productImg from '../../assets/images/shoe.png'
import './placeOrder.css'

import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

// const getStripe = () => {
//     if (!stripePromise) {
//         stripePromise = loadStripe('pk_test_51Lmam7ARhCzzGXQq4Mc30xtzHF0nH0M1t2NgUOoYuE2OO65tFhQlDG1hnjmLFSCEWZItmwYoW1pXkqFSdpQnha5h00TZRZo8fN')
//     }
//     return stripePromise;
// };

const PlaceOrder = () => {
    const { cartItems } = useGlobalContext()
    const [isLoading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [stripeError, setStripeError] = useState(null);

    const subTotal = cartItems.reduce((total, item) => total += item.price * item.quantity, 0)
    const quantity = cartItems.reduce((total, item) => total += item.quantity, 0)
    const tax = (subTotal * 5) / 100
    const grandTotal = subTotal + tax

    // const item = {
    //     price: "price_1LmenPARhCzzGXQqUWsHLbNw",
    //     // price: String(grandTotal),
    //     quantity: quantity
    // };

    // const checkoutOptions = {
    //     lineItems: [item],
    //     mode: "payment",
    //     successUrl: `${window.location.origin}/success`,
    //     cancelUrl: `${window.location.origin}/cancel`
    // };

    // const redirectToCheckout = async () => {
    //     setLoading(true);
    //     console.log("redirectToCheckout");

    //     const stripe = await getStripe();
    //     const { error } = await stripe.redirectToCheckout(checkoutOptions);
    //     console.log("Stripe checkout error", error);

    //     if (error) setStripeError(error.message);
    //     setLoading(false);
    // };

    // if (stripeError) alert(stripeError);

    const handleOrder = () => {
        setShow(true)
    }

    return (
        <React.Fragment>
            <Header />
            {show && <Modal show={show} setShow={setShow} />}
            <div className='PlaceOrder'>
                <Container>
                    <Row>
                        <Col>
                            <div className='order-details'>
                                <h3>Order Items</h3>
                                {cartItems.map(item =>
                                    <div key={item.id} className='order-item'>
                                        <article className='cart-item'>
                                            <div className="item-img">
                                                <img src={productImg} alt="shoes" />
                                            </div>
                                            <div className='item-details'>
                                                <h5>{item.name}</h5>
                                                <h6 className='item-price'>{item.quantity} x ${item.price} = ${item.quantity * item.price}</h6>
                                            </div>
                                        </article>
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col>
                            <div className="process-order">
                                <h3>Order Summary</h3>
                                <p>Subtotal <span>${subTotal}</span> </p>
                                <p>Tax <span>${tax}</span> </p>
                                <p><strong>Grand Total</strong> <span> <strong> ${grandTotal} </strong></span> </p>
                                <Button
                                    variant="success"
                                    onClick={handleOrder}
                                    disabled={cartItems.length === 0}
                                >
                                    {isLoading ? 'Loading...' : 'Place Order'}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default PlaceOrder