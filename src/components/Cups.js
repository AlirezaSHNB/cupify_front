import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCups } from '../utils/api';

function Cups() {
    const [cups, setCups] = useState([]);

    useEffect(() => {
        fetchCups()
        .then(data => {
            setCups(data.cups);
        })
        .catch(error => console.error('Error fetching cups:', error));
    }, []);

    return (
        <div>
            <h2>Cups</h2>
            <ul>
                {cups.map(cup => (
                    <li key={cup.id}>
                        <Link to={`/cups/${cup.id}`}>{cup.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cups;
