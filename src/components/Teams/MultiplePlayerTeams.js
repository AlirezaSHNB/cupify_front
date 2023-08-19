import React, { useEffect, useState } from 'react';
import { fetchMultiplePlayerTeams } from '../../utils/api';
import '../../index.css';

function MultiplePlayerTeams() {
    const [multiple_player_teams, setMultiplePlayerTeams] = useState([]);

    useEffect(() => {
        fetchMultiplePlayerTeams()
        .then(data => {
            setMultiplePlayerTeams(data.teams);
        })
        .catch(error => console.error('Error fetching multiple player teams:', error));
    }, []);

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
                    {multiple_player_teams.map(team => (
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

export default MultiplePlayerTeams;
