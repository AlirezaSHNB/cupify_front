const BASE_URL = 'http://localhost:3001';

export async function signUp(userData) {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: userData}),
    });

    return response.json();
}

export async function login(userData) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: userData}),
    });

    return response.json();
}

export async function logout() {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${BASE_URL}/logout`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    });
    if (response.ok) {
        localStorage.clear('authToken');
    }
    return response.json();
}

export async function fetchCurrentUser() {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/get_current_user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    let readable_content = await response.json()
    let status = await response.status

    return [status, readable_content];
}

export async function fetchCups() {
    const response = await fetch(`${BASE_URL}/cups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export async function fetchCup(id) {
    const response = await fetch(`${BASE_URL}/cups/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export async function fetchTeams() {
    const response = await fetch(`${BASE_URL}/participants`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export async function fetchTeam(id) {
    const response = await fetch(`${BASE_URL}/participants/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export async function fetchSinglePlayerTeams() {
    const response = await fetch(`${BASE_URL}/participants/single_player_teams`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export async function fetchMultiplePlayerTeams() {
    const response = await fetch(`${BASE_URL}/participants/multiple_player_teams`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export async function fetchPlayers() {
    const response = await fetch(`${BASE_URL}/players`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export async function fetchPlayer(id) {
    const response = await fetch(`${BASE_URL}/players/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export const createCup = async (cupData) => {
    try {
        const response = await fetch(`${BASE_URL}/cups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cupData),
        });

        if (!response.ok) {
            throw new Error('Failed to create cup');
        }

        return true;
    } catch (error) {
        throw error;
    }
};

export const addTeamToCup = async (cupId, teamId) => {
    try {
        const response = await fetch(`${BASE_URL}/cups/${cupId}/add_team`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({team_id: teamId}),
        });

        if (!response.ok) {
            throw new Error('Failed to add team with id=' + teamId + 'from cup with id=' + cupId);
        }

        return true;
    } catch (error) {
        throw error;
    }
};

export const removeTeamFromCup = async (cupId, teamId) => {
    try {
        const response = await fetch(`${BASE_URL}/cups/${cupId}/remove_team`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({team_id: teamId}),
        });

        if (!response.ok) {
            throw new Error('Failed to remove team with id=' + teamId + 'from cup with id=' + cupId);
        }

        return true;
    } catch (error) {
        throw error;
    }
};