import { useEffect, useState, useContext } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

export default function Workouts() {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);

  const fetchData = () => {
    fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data.message !== "string") {
          setWorkouts(data.workouts);
        } else {
          setWorkouts([]);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFetchData = () => {
    fetchData();
  };

  return (
    <>
      {
        (user.id !== null)
          ?
          workouts.length > 0
            ?
            <>
              <h1 className='text-center mt-5'>My Workouts</h1>
              <Row>
                {
                  workouts.map(workout => {
                    return (
                      <Col md={3}>
                        <WorkoutCard workout={workout} fetchData={handleFetchData} />
                      </Col>
                    );
                  })
                }
              </Row>
            </>
            :
            <>
              <h1>No Workout Found</h1>
            </>
          :
          <>
            <h1>You are not logged in</h1>
            <Link className="btn btn-primary" to={"/login"}>Login to View</Link>
          </>
      }
    </>
  );
}