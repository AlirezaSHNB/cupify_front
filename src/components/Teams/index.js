import SinglePlayerTeams from './SinglePlayerTeams'
import MultiplePlayerTeams from './MultiplePlayerTeams';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Teams({ numToShow }) {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login', { replace:true })
        }
    }, [navigate]);

    return (
        <div>
            <SinglePlayerTeams numToShow={numToShow}/>
            <br></br>
            <br></br>
            <MultiplePlayerTeams numToShow={numToShow}/>
        </div>
    );
}

export default Teams;
