// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, Route, Routes ,useNavigate} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Cups from './components/Cups/Cups';
import Cup from './components/Cups/Cup';
import Teams from './components/Teams';
import Team from './components/Teams/Team';
import Players from './components/Players/Players';
import Player from './components/Players/Player';
import Login from './pages/Login';
import { fetchCurrentUser, logout } from './utils/api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!!token) {
      fetchCurrentUser()
            .then(response => {
                if (response[0] === 200) {
                  setCurrentUser(response[1]);
                } else {
                  setCurrentUser(null);
                }
            }).catch(error => console.error('Error fetching user data:', error));
    } else {
      navigate('/login', { replace:true })
    }
  }, [navigate]);

  const handleLogout = async () => {
      try {
          const response = await logout();
          console.log(response)
          setCurrentUser(null);
      } catch (error) {
          console.error('Error logging out:', error);
      }
  };

  return (
      <div className="App">
        <nav>
          <ul>
            <p>
              <Link to="/">
                <button className="show-button">Home</button>
              </Link>
            </p>
            <p>
              {currentUser ? (
                <>
                  <button className="show-button" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <p>
                  <Link to="/signup">
                    <button className="show-button">Sign Up</button>
                  </Link>
                  &nbsp;
                  <Link to="/login">
                    <button className="show-button">Login</button>
                  </Link>
                </p>
              )}
            </p>
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/cups" element={<Cups/>} />
          <Route path="/cups/:cupId" element={<Cup />} /> 
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<Team />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:playerId" element={<Player />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser} />} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
  );
}

export default App;
