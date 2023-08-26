import Cups from '../components/Cups';
import Teams from '../components/Teams';
import Players from '../components/Players';
import { fetchCurrentUser} from '../utils/api';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Home() {
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
    }, []);

    return (

        <div>            
            <Cups/>
            <br></br>
            <Link to="/cups">
                <button className="show-button">Show All</button>
            </Link>
            <br></br>
            <br></br>
            <Teams/>
            <br></br>
            <Link to="/teams">
                <button className="show-button">Show All</button>
            </Link>
            <br></br>
            <br></br>
            <Players/>
            <br></br>
            <Link to="/teams">
                <button className="show-button">Show All</button>
            </Link>
        </div>
    );
}

export default Home;
