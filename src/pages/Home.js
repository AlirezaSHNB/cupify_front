import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchHomeData } from '../utils/api';

function Home() {
    const [cups, setCups] = useState([]);
    const [teams, setTeams] = useState([]);
    const [persons, setPersons] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetchHomeData()
        .then(data => {
            setCups(data.cups);
            setTeams(data.teams);
            setPersons(data.persons);
            setPlayers(data.players);
        })
        .catch(error => console.error('Error fetching home data:', error));
    }, []);

    return (
        <div>
            <h2>Home Page</h2>
            <h3>Cups</h3>
            <ul>
                {cups.map(cup => (
                    <li key={cup.id}>
                        <Link to={`/cup/${cup.id}`}>NAME: {cup.name}</Link>
                    </li>
                ))}
            </ul>
            <h3>Teams</h3>
            <ul>
                {teams.map(team => (
                    <li key={team.id}>
                        <Link to={`/participants/${team.id}`}>{team.name}</Link>
                    </li>
                ))}
            </ul>
            <h3>Persons</h3>
            <ul>
                {persons.map(person => (
                    <li key={person.id}>
                        <Link to={`/participants/${person.id}`}>{person.name}</Link>
                    </li>
                ))}
            </ul>
            <h3>Players</h3>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                        <Link to={`/players/${player.id}`}>{player.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
