
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
                role
            });

            toast.success(res.data.message || "Registration successful!");

            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col>
                    <Card style={{ padding: '2rem', minWidth: '350px' }}>
                        <h3 className="text-center mb-4">Register</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
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

                            <Form.Group controlId="formRole" className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="candidate">Candidate</option>
                                </Form.Select>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Register
                            </Button>

                            <div className="text-center mt-3">
                                Already Registered? <Link to="/">Login</Link>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <ToastContainer position="top-center" />
        </Container>
    );
};

export default Register;
