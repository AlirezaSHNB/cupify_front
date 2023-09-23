import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCup, fetchTeams, removeTeamFromCup, addTeamToCup } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

function Cup() {
    const { cupId } = useParams();
    const [cup, setCup] = useState(null);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!!token) {
            fetchCup(cupId)
                .then(data => {
                    setCup(data.cup);
                })
                .catch(error => console.error('Error fetching cup:', error));
            
            // Fetch the current teams for the cup
            fetchTeams(cupId)
                .then(data => {
                    setTeams(data.teams);
                })
                .catch(error => console.error('Error fetching teams:', error));
        } else {
            navigate('/login', { replace: true });
        }
    }, [cupId, navigate]);

    const handleRemoveTeam = (teamId) => {
        // Call API to remove the team from the cup
        removeTeamFromCup(cupId, teamId)
            .then(() => {
                // Update the list of teams
                const updatedTeams = teams.filter(team => team.id !== teamId);
                setTeams(updatedTeams);
            })
            .catch(error => console.error('Error removing team:', error));
    };

    const handleAddTeam = () => {
        if (selectedTeam) {
            // Call API to add the selected team to the cup
            addTeamToCup(cupId, selectedTeam.id)
                .then(() => {
                    // Update the list of teams
                    const updatedTeams = [...teams, selectedTeam];
                    setTeams(updatedTeams);
                    // Clear the selected team
                    setSelectedTeam(null);
                })
                .catch(error => console.error('Error adding team:', error));
        }
    };

    const handleSearch = (value) => {
        console.log(value)
        // Call API to search for compatible teams based on searchTerm, cup.mode, and cup.number_of_players
        // Update the state with the search results
        // Replace the following line with your actual API call
        const searchResults = [];
        setTeams(searchResults);
    };

    return (
        <div>
            {cup ? (
                <div>
                    <h2>Cup</h2>
                    <p>Name: {cup.name}</p>
                    <p>State: {cup.state}</p>

                    <h3>Current Teams</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map(team => (
                                <tr key={team.id}>
                                    <td>{team.name}</td>
                                    <td>
                                        <button onClick={() => handleRemoveTeam(team.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div>
                        <input
                            type="text"
                            placeholder="Search for teams"
                            onChange={e => { handleSearch(e.target.value) }}
                            onClick={e => { handleSearch(e.target.value) }}
                        />
                        <select onChange={e => setSelectedTeam(e.target.value)}>
                            <option value="">Select a team</option>
                            {teams.map(team => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleAddTeam}
                            disabled={teams.length >= cup.max_number_of_participants}
                        >
                            Add New Team
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading cup ...</p>
            )}
        </div>
    );
}

export default Cup;
