import React, { useState, useEffect } from 'react';
import { fetchCurrentUser, logout } from '../utils/api';

function UserProfile({ user }) {
    const [currentUser, setCurrentUser] = useState(user);

    useEffect(() => {
        fetchCurrentUser()
            .then(data => {
                setCurrentUser(data.user);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleLogout = async () => {
        try {
            const response = await logout();
            console.log(response); // Handle the response accordingly
            setCurrentUser(null); // Reset the currentUser state
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                {/* Display other user data */}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default UserProfile;
