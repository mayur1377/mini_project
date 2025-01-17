import { useState, useEffect } from 'react';
import './Teacher_Dashboard.css';
import axios from 'axios';

const Teacher_Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      setUser(JSON.parse(localStorage.getItem('user')));
    } else {
      alert('Please Login First');
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    localStorage.setItem('loggedIn', false);
    try {
      const res = await axios.post('http://localhost:5000/api/override/attendance', {
        attendance_override: false,
        teacher: '',
      });
    } catch (err) {
      console.log(err);
    }
    window.location.href = '/login';
  };

  return (
    <div className="teacher-dashboard">
      <h1 className="dashboard-title">Teacher Dashboard</h1>
      <h2 className="welcome-message">Welcome Teacher {user.name}</h2>
      <ul className="dashboard-menu">
        <li>
          <a href="/coordinate">Add/Update Coordinates</a>
        </li>
        <li>View Attendance</li>
        <li>
          <a href="/take_attendance">Take Attendance</a>
        </li>
      </ul>
      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
    
  );
};

export default Teacher_Dashboard;
