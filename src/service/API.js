import { API_CONFIG } from '../config/constants';

const handleResponse = async (response) => {
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized - Please check your API token');
        }
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const apiClient = {
    get: async (endpoint) => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.BEARER_TOKEN}`,
                    'accept': 'application/json'
                }
            });
            return handleResponse(response);
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }
};