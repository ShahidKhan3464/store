import React, { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from '../../contextApi/Context'
import axios from 'axios'
import Swal from 'sweetalert2'
import Form from "react-bootstrap/Form"
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button"
import signIn from "../../assets/images/signIn.png"
import Header from "../../components/header/Header"
import Loader from "../../components/loader/Loader"
import { Underline } from '../../components/underline/Underline'
import '../index.css'

const SignIn = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [email, setEmail] = useState('')
    const { setLoggedIn } = useGlobalContext()
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('' || state)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data, status } = await axios.post("https://lsm-back-end.herokuapp.com/api/signin", {
                email: email,
                password: password
            })

            if (status === 200) {
                localStorage.setItem('token', JSON.stringify(data.auth_token))
                setLoggedIn(true)
                setLoading(false)
                navigate("/")
            }
        }
        catch (err) {
            setLoading(true)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Invalid Password or Email'
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }, [message])

    return (
        <React.Fragment>
            <Header />
            {message && <Alert variant='warning'>{message}</Alert>}
            <section className="SignIn">
                <div className="title">
                    <h2>SignIn</h2>
                    <Underline />
                </div>
                {loading
                    ? <Loader />
                    : <div className="flex-container">
                        <div className="signIn-img">
                            <img src={signIn} alt="signIn" />
                        </div>
                        <Form className='was-validated' onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    required
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control
                                    required
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="success" type="submit">SignIn</Button>
                            <p>
                                Don't have an account?
                                <Link to="/signUp"> Sign Up</Link>
                            </p>
                        </Form>
                    </div>
                }
            </section>
        </React.Fragment>
    )
}

export default SignIn;