// Dependecies Packages
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Components
import AppNavBar from './components/AppNavBar';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Logout from  './pages/Logout';
import Workouts from './pages/Workouts';
import AddWorkout from './pages/AddWorkout';
import Error from './pages/Error';

import './App.css';
import {UserProvider} from './UserContext'


export default function App() {
  const [user, setUser] = useState({
    id: null
  });
  
  const unsetUser  = () => {
    localStorage.clear();
    setUser({ id: null });
  };

  return(
    <UserProvider value={{user, setUser, unsetUser}}>
    <Router>
      <AppNavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/addWorkout" element={<AddWorkout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Container>
    </Router>
  </UserProvider>
  )
};