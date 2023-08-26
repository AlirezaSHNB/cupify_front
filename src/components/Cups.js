import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCups } from '../utils/api';
import '../index.css';

function Cups() {
    const [cups, setCups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!!token) {
            fetchCups()
            .then(data => {
                setCups(data.cups);
            })
            .catch(error => console.error('Error fetching cups:', error));
        } else {
            navigate('/login', { replace:true })
        }
    }, []);

    const handleShowCup = (cupId) => {
        navigate(`/cups/${cupId}`);
    };

    return (
        <div>
            <h2>Cups</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Field</th>
                        <th>State</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Winner</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cups.map(cup => (
                        <tr>
                            <td>{ cup.name }</td>
                            <td>{ cup.field }</td>
                            <td>{ cup.state }</td>
                            <td>{ cup.start_date }</td>
                            <td>{ cup.end_date }</td>
                            <td>{ cup.winner?.name }</td>
                            <td>
                                <button className="show-button" onClick={() => handleShowCup(cup.id)}>Show</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Cups;
