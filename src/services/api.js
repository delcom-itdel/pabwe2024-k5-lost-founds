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
