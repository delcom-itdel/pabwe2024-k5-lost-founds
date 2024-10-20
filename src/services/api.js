import axios from 'axios';

const API_BASE_URL = 'https://public-api.delcom.org/api/v1';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.get(`${API_BASE_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data.success) {
            return response.data.data.user; // return the user profile data
        } else {
            throw new Error(response.data.message || 'Failed to fetch profile data');
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};


export const fetchLostAndFoundData = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.get(`${API_BASE_URL}/lost-founds`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data.success) {
            return response.data.data.lost_founds;
        } else {
            throw new Error(response.data.message || 'Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching lost and found data:', error);
        throw error;
    }
};

export const addLostAndFoundData = async (title, description, status) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.post(`${API_BASE_URL}/lost-founds`,
            new URLSearchParams({
                title,
                description,
                status
            }), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.data.success) {
            return response.data;
        } else {
            throw new Error(response.data.message || 'Failed to add data');
        }
    } catch (error) {
        console.error('Error adding lost and found data:', error);
        throw error;
    }
};

export const fetchLostAndFoundDetail = async (id) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.get(`${API_BASE_URL}/lost-founds/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data.success) {
            return response.data.data.lost_found;
        } else {
            throw new Error(response.data.message || 'Failed to fetch detail data');
        }
    } catch (error) {
        console.error('Error fetching lost and found detail:', error);
        throw error;
    }
};


