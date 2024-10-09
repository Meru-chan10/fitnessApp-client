import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {
    const { user, setUser  } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    const authenticate = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/users/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (data.access) {
                localStorage.setItem('token', data.access);
                setUser (data.access);

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to your Fitness App Tracker!"
                });

                navigate('/');
            } else {
                Swal.fire({
                    title: "Authentication failed",
                    icon: "error",
                    text: "Check your login details and try again."
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Authentication failed",
                icon: "error",
                text: "Invalid email or password. Please try again."
            });
            console.error(error);
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    if (user.id !== null) {
        return <Navigate to="/" />;
    }

    return (
        <Form onSubmit={authenticate}>
            <h1 className="my-5 text-center">Login</h1>
            <Form.Group controlId="userEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant={isActive ? "primary" : "danger"} type="submit" id="submitBtn" disabled={!isActive}>
                Submit
            </Button>
        </Form>
    );
}