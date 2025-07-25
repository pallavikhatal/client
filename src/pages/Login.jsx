
import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);

            toast.success("Login Successful!");

            setTimeout(() => {
                if (user.role === "admin") navigate("/admin");
                else navigate("/candidate");
            }, 1500);

        } catch (error) {
            toast.error(error?.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col>
                    <Card style={{ padding: '2rem', minWidth: '350px' }}>
                        <h3 className="text-center mb-4">Login Form</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Log In
                            </Button>

                            <div className="text-center mt-3">
                                Don't have an account? <Link to="/register">Register</Link>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>

            <ToastContainer position="top-center" />
        </Container>
    );
};

export default Login;
