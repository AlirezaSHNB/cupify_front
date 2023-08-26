import React, { useState, useEffect } from 'react';
import { fetchCurrentUser, logout } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!!token) {
            fetchCurrentUser()
                .then(response => {
                    if (response[0] === 200) {
                        setCurrentUser(response[1]);
                    } else {
                        setCurrentUser(null);
                    }
                }).catch(error => console.error('Error fetching user data:', error));
        } else {
            navigate('/login', { replace:true })
        }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await logout();
            console.log(response);
            setCurrentUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <p>Username: {currentUser.username}</p>
                <p>Email: {currentUser.email}</p>
                {/* Display other user data */}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default UserProfile;
