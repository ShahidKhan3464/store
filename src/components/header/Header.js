import React from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { useGlobalContext } from '../../contextApi/Context'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './header.css'

const Header = () => {
    const navigate = useNavigate()
    const { loggedIn, cartItems, setLoggedIn } = useGlobalContext()

    const handleLogOut = () => {
        setLoggedIn(localStorage.clear())
        navigate("/")
    }

    return (
        <header>
            <Navbar expand="lg">
                <Container>
                    <Link to="/">
                        <span className='logo-text'>Store</span>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/#home">About</NavLink>
                            <NavLink to="/#home">Contact</NavLink>
                            <div className='cart-icon'>
                                <NavLink to="/cart">
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                                        <path d='M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z' />
                                    </svg>
                                </NavLink>
                                {cartItems.length === 0 ? ''
                                    : <div className='quantity'>
                                        <p className='total-quantity'>
                                            {cartItems.reduce((total, item) => total += item.quantity, 0)}
                                        </p>
                                    </div>
                                }
                            </div>
                        </Nav>
                        <div className='btns'>
                            {!loggedIn
                                ? <>
                                    <NavLink to="/signIn">
                                        <Button variant="warning">SignIn</Button>
                                    </NavLink>
                                    <NavLink to="/signUp">
                                        <Button variant="warning">SignUp</Button>
                                    </NavLink>
                                </>
                                : <Button variant="warning" onClick={handleLogOut}>SignOut</Button>
                            }
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header