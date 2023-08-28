import Cups from '../components/Cups/Cups';
import Teams from '../components/Teams';
import Players from '../components/Players/Players';
import React, { useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login', { replace:true })
        }
    }, [navigate]);

    return (

        <div>            
            <Cups numToShow={3}/>
            <br></br>
            <Link to="/cups">
                <button className="show-button">Show All</button>
            </Link>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Teams numToShow={3}/>
            <br></br>
            <Link to="/teams">
                <button className="show-button">Show All</button>
            </Link>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Players numToShow={3}/>
            <br></br>
            <Link to="/players">
                <button className="show-button">Show All</button>
            </Link>
            <br></br>
            <br></br>
        </div>
    );
}

export default Home;
