import React, { useEffect, useState } from 'react';
import { fetchPlayers } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Players() {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate()

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
    }, []);

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
                    {players.map(player => (
                        <tr>
                            <td>{ player.username }</td>
                            <td>{ player.first_name }</td>
                            <td>{ player.last_name }</td>
                            <td>{ player.nickname }</td>
                            <td>{ player.date_of_birth }</td>
                            <td>
                                <button class="show-button" onclick={`window.location.href='/players/${player.id}'`}>Show</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Players;
