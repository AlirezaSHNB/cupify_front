// Api.js
const BASE_URL = 'http://localhost:3001'; // Update with your Rails API URL

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

    return response;
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

export async function fetchHomeData() {
    const response = await fetch(`${BASE_URL}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}
