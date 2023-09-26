import SinglePlayerTeams from './SinglePlayerTeams'
import MultiplePlayerTeams from './MultiplePlayerTeams';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateModal from './CreateModal';
import { fetchTeams, createTeam, fetchSearchedPlayers } from '../../utils/api';

function Teams({ numToShow }) {
    const navigate = useNavigate()
    const fieldOptions = ["futsal", "football", "individual_fifa23", "team_fifa23", "individual_pes23", "team_pes23"]
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTeamData, setNewTeamData] = useState({
        name: '',
        field: '',
        players: []
    });
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login', { replace:true })
        }
    }, [navigate]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewTeamData({
            name: '',
            field: '',
            players: []
        });
        setSearchResults([]);
        setSelectedPlayers([]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTeamData({
            ...newTeamData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        newTeamData.players = selectedPlayers.map(player => player.id);
        createTeam(newTeamData)
            .then(() => {
                fetchTeams()
                    .then(data => {
                        setIsModalOpen(false);
                        console.log(data)
                    })
                    .catch(error => console.error('Error fetching teams:', error));
            })
            .catch(error => console.error('Error creating teams:', error));
    };

    const handleShowCreateModal = () => {
        setIsModalOpen(true);
    };

    const handleSearch = (value) => {
        console.log(value)
        fetchSearchedPlayers(value)
            .then(data => {
                setSearchResults(data.players);
                console.log(searchResults)
            })
            .catch(error => console.error('Error fetching searched players:', error));
    };

    const handleSelectPlayer = (player) => {
        setSelectedPlayers([...selectedPlayers, player]);
        setSearchResults([]);
    };

    return (
        <div>
            <SinglePlayerTeams numToShow={numToShow}/>
            <br></br>
            <br></br>
            <MultiplePlayerTeams numToShow={numToShow}/>
            <br></br>
            <button className="show-button" onClick={() => handleShowCreateModal()}>Create New Team</button>
            <br></br>
            <br></br>

            {isModalOpen && (
                <CreateModal onClose={handleCloseModal}>
                    <div className="modal-form">
                        <div className="input-container">
                            <label htmlFor="teamName">Team Name</label>
                            <input
                                type="text"
                                id="teamName"
                                name="name"
                                value={newTeamData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="teamField">Field</label>
                            <select
                                id="cupField"
                                name="field"
                                value={newTeamData.field}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a field</option>
                                {fieldOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search players..."
                                onChange={e => { handleSearch(e.target.value) }}
                                onClick={e => { handleSearch(e.target.value) }}
                            />
                            <div className="search-results">
                                {searchResults.length > 0 && (
                                    <ul>
                                        {searchResults.map((player, index) => (
                                            <li key={index} onClick={() => handleSelectPlayer(player)}>
                                                {player.username}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="selected-players">
                            <h2>Selected Players:</h2>
                            <ul>
                                {selectedPlayers.map((player, index) => (
                                    <li key={index}>{player.username}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="modal-step">
                            <button type="submit" onClick={handleSubmit} >Create Team</button>
                        </div>
                    </div>
                </CreateModal>
            )}
        </div>
    );
}

export default Teams;
