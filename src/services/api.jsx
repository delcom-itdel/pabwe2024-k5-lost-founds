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

export const updateProfile = async (name, email) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.put(
            `${API_BASE_URL}/users/me`,
            new URLSearchParams({ name, email }),
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        if (response.data.success) {
            return response.data.data.user;
        } else {
            throw new Error(response.data.message || 'Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

export const changeProfilePhoto = async (photoFile) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const formData = new FormData();
        formData.append('photo', photoFile);

        const response = await axios.post(
            `${API_BASE_URL}/users/photo`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.data.success) {
            return response.data.message;
        } else {
            throw new Error(response.data.message || 'Failed to update profile photo');
        }
    } catch (error) {
        console.error('Error updating profile photo:', error);
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

export const addLostAndFoundData = async (title, description, status, author) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.post(`${API_BASE_URL}/lost-founds`,
            new URLSearchParams({
                title,
                description,
                status,
                author
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

export const editLostAndFoundData = async (id, title, description, status, is_completed) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.put(`${API_BASE_URL}/lost-founds/${id}`,
            new URLSearchParams({
                title,
                description,
                status,
                is_completed
            }), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.data.success) {
            return response.data;
        } else {
            throw new Error(response.data.message || 'Failed to update data');
        }
    } catch (error) {
        console.error('Error updating lost and found data:', error);
        throw error;
    }
};

export const deleteLostAndFoundData = async (id) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.delete(`${API_BASE_URL}/lost-founds/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.success) {
            return response.data;
        } else {
            throw new Error(response.data.message || 'Failed to delete data');
        }
    } catch (error) {
        console.error('Error deleting lost and found data:', error);
        throw error;
    }
};

export const getDailyStats = async (endTime, totalData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.get(`${API_BASE_URL}/lost-founds/stats/daily`, {
            params: {
                end_date: endTime,
                total_data: totalData
            },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to fetch daily stats');
        }
    } catch (error) {
        console.error('Error fetching daily stats:', error);
        throw error;
    }
};


export const getMonthlyStats = async (endTime, totalData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.get(`${API_BASE_URL}/lost-founds/stats/monthly`, {
            params: {
                end_date: endTime,
                total_data: totalData
            },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to fetch monthly stats');
        }
    } catch (error) {
        console.error('Error fetching monthly stats:', error);
        throw error;
    }
};
