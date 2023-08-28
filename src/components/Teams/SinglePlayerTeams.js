import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSinglePlayerTeams } from '../../utils/api';
import '../../index.css';

function SinglePlayerTeams({ numToShow }) {
    const [singlePlayerTeams, setSinglePlayerTeams] = useState([]);
    const navigate = useNavigate();
    const singlePlayerTeamsToDisplay = numToShow !== undefined ? singlePlayerTeams.slice(0, numToShow) : singlePlayerTeams;

    useEffect(() => {
        fetchSinglePlayerTeams()
        .then(data => {
            setSinglePlayerTeams(data.teams);
        })
        .catch(error => console.error('Error fetching single player teams:', error));
    }, []);

    const handleShowTeam = (teamId) => {
        navigate(`/teams/${teamId}`);
    };

    return (
        <div>
            <h2>Single Player Teams</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {singlePlayerTeamsToDisplay.map(team => (
                        <tr>
                            <td>{ team.name }</td>
                            <td>
                                <button class="show-button" onClick={() => handleShowTeam(team.id)}>Show</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SinglePlayerTeams;
