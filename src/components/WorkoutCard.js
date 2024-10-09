import { Card, Modal, Form, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function GameCard({ workout, fetchData }) {
  const { name, duration, status, dateAdded } = workout;
  const [workoutId] = useState(workout._id);
  const { user } = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDuration, setNewDuration] = useState(duration);

  function updateWorkout() {
    fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${workoutId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ name: newName, duration: newDuration })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (data.error === "Error in Saving") {
          Swal.fire({
            icon: "error",
            title: "Unsuccessful workout Update",
            text: data.message
          })
        } else {
          Swal.fire({
            icon: "success",
            title: "Workout Updated"
          })
          fetchData();

          setShowUpdateModal(false);
        }
      })
  }


  function updateWorkoutStatus() {
    fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${workoutId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
  
        if (data.error === "Error in Saving") {
          Swal.fire({
            icon: "error",
            title: "Unsuccessful Game Update",
            text: data.message
          })
        } else {
          Swal.fire({
            icon: "success",
            title: "Game Updated"
          })
        
            fetchData();
          
        }
      })
  }

  function deleteWorkout() {
    fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${workoutId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error === "Error in Saving") {
          Swal.fire({
            icon: "error",
            title: "Unsuccessful workout Deletion",
            text: data.message
          })
        } else {
          Swal.fire({
            icon: "success",
            title: "Workout Deleted"
          })
          fetchData();
        }
      })
  }

  return (
   
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>Description:</Card.Subtitle>
          <Card.Text>{duration}</Card.Text>
          <Card.Subtitle>Status:</Card.Subtitle>
          <Card.Text>{status}</Card.Text>
          <Card.Subtitle>Date Added:</Card.Subtitle>
          <Card.Text>{dateAdded}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-around">
          <button className="btn btn-primary btn-sm" onClick={() => setShowUpdateModal(true)}>Update</button>
          <button className="btn btn-secondary btn-sm" onClick={() => updateWorkoutStatus()}>Update Status</button>
          <button className="btn btn-danger btn-sm" onClick={() => deleteWorkout()}>Delete</button>
        </Card.Footer>

        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="duration">
                <Form.Label>Duration:</Form.Label>
                <Form.Control type="text" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
            <Button variant="primary" onClick={() => updateWorkout()}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

      </Card>
    
  )
}