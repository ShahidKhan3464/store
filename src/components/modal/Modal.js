import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StripeCheckout from 'react-stripe-checkout';

const Modals = ({ show, setShow }) => {

    const onToken = (token) => {
        fetch('/save-stripe-token', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(response => {
            response.json().then(data => {
                alert(`We are in business, ${data.email}`);
            });
        });
    }

    return (

        <Modal show={show} onHide={() => setShow(false)}>
            <StripeCheckout
                token={onToken}
                stripeKey="pk_test_51Lmam7ARhCzzGXQq4Mc30xtzHF0nH0M1t2NgUOoYuE2OO65tFhQlDG1hnjmLFSCEWZItmwYoW1pXkqFSdpQnha5h00TZRZo8fN"
                name="Three Comma Co." // the pop-in header title
                description="Big Data Stuff" // the pop-in header subtitle
                image="https://stripe.com/img/documentation/checkout/marketplace.png" // the pop-in header image (default none)
                ComponentClass="div"
                label="Buy the Thing" // text inside the Stripe button
                panelLabel="Give Money" // prepended to the amount in the bottom pay button
                amount={1000000} // cents
                currency="USD"
                locale="zh"
                email="info@vidhub.co"
                // Note: Enabling either address option will give the user the ability to
                // fill out both. Addresses are sent as a second parameter in the token callback.
                shippingAddress
                billingAddress={false}
                // Note: enabling both zipCode checks and billing or shipping address will
                // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                zipCode={false}
                alipay // accept Alipay (default false)
                bitcoin // accept Bitcoins (default false)
                allowRememberMe // "Remember Me" option (default true)
                // opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
                // closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
                // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
                // you are using multiple stripe keys
                reconfigureOnUpdate={false}
                // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                // useful if you're using React-Tap-Event-Plugin
                triggerEvent="onTouchTap"
            >
                <button className="btn btn-primary">
                    Use your own child component, which gets wrapped in whatever
                    component you pass into as "ComponentClass" (defaults to span)
                </button>
            </StripeCheckout>
        </Modal>
    );
}

export default Modals