import React, { useState } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import signUp from "../../assets/images/signUp.png"
import Header from "../../components/header/Header"
import Loader from "../../components/loader/Loader"
import { Underline } from '../../components/underline/Underline'
import '../index.css'

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [contact, setContact] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data, status } = await axios.post("https://lsm-back-end.herokuapp.com/api/register", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                contactNo: contact
            })

            if (status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `${data.message}`
                })
                setLoading(false)
            }
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setContact('')
        }
        catch (err) {
            setLoading(true)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `${err.response && err.response.data ? err.response.data.message : err.message}`
            })
            setLoading(false)
        }
    }

    return (
        <React.Fragment>
            <Header />
            <section className="signUp">
                <div className="title">
                    <h2>Sign Up</h2>
                    <Underline />
                </div>
                {loading
                    ? <Loader />
                    : <div className="flex-container">
                        <div className="signUp-img">
                            <img src={signUp} alt="signUp" />
                        </div>
                        <Form className='was-validated' onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="firstName">FirstName</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    minLength='5'
                                    maxLength='30'
                                    id="firstName"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="lastName">LastName</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    minLength='5'
                                    maxLength='30'
                                    id="lastName"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    required
                                    id="email"
                                    type="email"
                                    value={email}
                                    minLength='10'
                                    maxLength='30'
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control
                                    required
                                    id="password"
                                    minLength='5'
                                    maxLength='10'
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="contact">Contact</Form.Label>
                                <Form.Control
                                    required
                                    id="contact"
                                    minLength='11'
                                    // maxLength='12'
                                    type="number"
                                    value={contact}
                                    onChange={e => setContact(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="success" type="submit">Create Account</Button>
                            <p>
                                Already have an account?
                                <Link to="signIn"> Sign in</Link>
                            </p>
                        </Form>
                    </div>
                }
            </section>
        </React.Fragment>
    )
}

export default SignUp;