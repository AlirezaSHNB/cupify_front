import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCup } from '../api';

function Cup() {
    const { cupId } = useParams();
    const [cup, setCup] = useState(null);

    useEffect(() => {
        fetchCup(cupId)
            .then(data => {
                setCup(data.cup);
            })
            .catch(error => console.error('Error fetching cup:', error));
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
