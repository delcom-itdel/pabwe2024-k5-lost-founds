import axios from 'axios';

const API_BASE_URL = 'https://public-api.delcom.org/api/v1';

// Function to handle user login
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

// Function to handle user registration
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
