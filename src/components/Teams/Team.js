import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTeam } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

function Team() {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!!token) {
            fetchTeam(teamId)
                .then(data => {
                    setTeam(data.team);
                })
                .catch(error => console.error('Error fetching team:', error));
        } else {
            navigate('/login', { replace:true })
        }
    }, [teamId, navigate]);

    return (
        <div>
            {team ? (
                <div>
                    <h2>Team</h2>
                    <p>Name: {team.name}</p>
                    {/* Display other cup details */}
                </div>
            ) : (
                <p>Loading cup ...</p>
            )}
        </div>
    );
}

export default Team;
