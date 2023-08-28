import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCup } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

function Cup() {
    const { cupId } = useParams();
    const [cup, setCup] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!!token) {
            fetchCup(cupId)
                .then(data => {
                    setCup(data.cup);
                })
                .catch(error => console.error('Error fetching cup:', error));
        } else {
            navigate('/login', { replace:true })
        }
    }, [cupId]);

    return (
        <div>
            {cup ? (
                <div>
                    <h2>Cup</h2>
                    <p>Name: {cup.name}</p>
                    {/* Display other cup details */}
                </div>
            ) : (
                <p>Loading cup ...</p>
            )}
        </div>
    );
}

export default Cup;
