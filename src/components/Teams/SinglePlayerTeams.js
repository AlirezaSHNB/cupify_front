import React, { useEffect, useState } from 'react';
import { fetchSinglePlayerTeams } from '../../utils/api';
import '../../index.css';

function SinglePlayerTeams() {
    const [single_player_teams, setSinglePlayerTeams] = useState([]);

    useEffect(() => {
        fetchSinglePlayerTeams()
        .then(data => {
            setSinglePlayerTeams(data.teams);
        })
        .catch(error => console.error('Error fetching single player teams:', error));
    }, []);

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
                    {single_player_teams.map(team => (
                        <tr>
                            <td>{ team.name }</td>
                            <td>
                                <button class="show-button" onclick={`window.location.href='/teams/${team.id}'`}>Show</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SinglePlayerTeams;
