import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMultiplePlayerTeams } from '../../utils/api';
import '../../index.css';

function MultiplePlayerTeams({ numToShow }) {
    const [multiplePlayerTeams, setMultiplePlayerTeams] = useState([]);
    const navigate = useNavigate();
    const multiplePlayerTeamsToDisplay = numToShow !== undefined ? multiplePlayerTeams.slice(0, numToShow) : multiplePlayerTeams;

    useEffect(() => {
        fetchMultiplePlayerTeams()
        .then(data => {
            setMultiplePlayerTeams(data.teams);
        })
        .catch(error => console.error('Error fetching multiple player teams:', error));
    }, []);

    const handleShowTeam = (teamId) => {
        navigate(`/teams/${teamId}`);
    };

    return (
        <div>
            <h2>Multiple Player Teams</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {multiplePlayerTeamsToDisplay.map(team => (
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

export default MultiplePlayerTeams;
