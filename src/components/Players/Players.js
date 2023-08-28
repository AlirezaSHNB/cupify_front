import React, { useEffect, useState } from 'react';
import { fetchPlayers } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

function Players({ numToShow }) {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate()
    const playersToDisplay = numToShow !== undefined ? players.slice(0, numToShow) : players;

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!!token) {
            fetchPlayers()
            .then(data => {
                setPlayers(data.players);
            })
            .catch(error => console.error('Error fetching players:', error));
        } else {
            navigate('/login', { replace:true })
        }
    }, [navigate]);

    const handleShowPlayer = (playerId) => {
        navigate(`/players/${playerId}`);
    };

    return (
        <div>
            <h2>Players</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Nickname</th>
                        <th>Date of Birth</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {playersToDisplay.map(player => (
                        <tr>
                            <td>{ player.username }</td>
                            <td>{ player.first_name }</td>
                            <td>{ player.last_name }</td>
                            <td>{ player.nickname }</td>
                            <td>{ player.date_of_birth }</td>
                            <td>
                                <button class="show-button" onClick={() => handleShowPlayer(player.id)}>Show</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Players;
