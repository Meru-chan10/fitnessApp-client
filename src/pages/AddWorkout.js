import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddWorkout() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const createWorkout = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, duration }),
      });

      const data = await response.json();

      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Unsuccessful Workout Creation',
          text: data.error,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Workout Added',
        });
        navigate('/workouts');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Unsuccessful Workout Creation',
        text: 'An error occurred while adding workout.',
      });
    }

    setName('');
    setDuration('');
  };

  return (
    <>
      <h1 className="my-5 text-center">Add Workout</h1>
      <Form onSubmit={createWorkout}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            value={name}
            onChange={handleInputChange(setName)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Duration:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Duration"
            required
            value={duration}
            onChange={handleInputChange(setDuration)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-5">
          Submit
        </Button>
      </Form>
    </>
  );
}