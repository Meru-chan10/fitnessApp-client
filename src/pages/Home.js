import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Home() {

   

    return (

        <Row>
            <Col className="mt-5 pt-5 text-center mx-auto">
                <h1>Welcome to your Personal Fitness App Tracker</h1>
                <p>Transform your fitness journey with our sleek and intuitive fitness app tracker! Track your workouts, monitor your progress, and stay motivated with personalized goals and insights. It's your ultimate companion for a healthier, stronger you. 📲💪</p>
                <Link className="btn btn-primary" to={"/workouts"}>Manage your Fitness Tracker</Link>
            </Col>
        </Row>
    )
}