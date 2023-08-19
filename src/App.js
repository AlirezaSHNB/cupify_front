// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Cups from './components/Cups';
import Login from './pages/Login';
import { fetchCurrentUser, logout } from './utils/api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
      fetchCurrentUser()
          .then(response => {
              if (response.ok) {
                setCurrentUser(response.json());
              } else {
                setCurrentUser(null);
              }
          }).catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleLogout = async () => {
      try {
          const response = await logout().json();
          console.log(response);
          setCurrentUser(null);
      } catch (error) {
          console.error('Error logging out:', error);
      }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <p>
              <Link to="/">Home</Link>
            </p>
            <p>
              {currentUser ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <p>
                  <Link to="/signup">Sign Up</Link>
                  /
                  <Link to="/login">Login</Link>
                </p>
              )}
            </p>
            <p>
              <Link to="/cups">Cups</Link>
            </p>
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/cups" element={<Cups/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
