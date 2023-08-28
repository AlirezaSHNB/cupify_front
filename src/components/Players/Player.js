import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlayer } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

function Player() {
    const { playerId } = useParams();
    const [player, setPlayer] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!!token) {
            fetchPlayer(playerId)
                .then(data => {
                    setPlayer(data.player);
                })
                .catch(error => console.error('Error fetching player:', error));
        } else {
            navigate('/login', { replace:true })
        }
    }, [playerId, navigate]);

    return (
        <div>
            {player ? (
                <div>
                    <h2>Player</h2>
                    <p>Username: {player.username}</p>
                    <p>First Name: {player.first_name}</p>
                    <p>Last Name: {player.last_name}</p>
                    <p>Nickname: {player.nickname}</p>
                    <p>Date Of Birth : {player.date_of_birth}</p>
                </div>
            ) : (
                <p>Loading Player ...</p>
            )}
        </div>
    );
}

export default Player;
