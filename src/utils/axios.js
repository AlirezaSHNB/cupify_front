import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Update with your Rails API URL

const axiosClient = axios.create({
    baseURL: BASE_URL,
});

export default axiosClient;