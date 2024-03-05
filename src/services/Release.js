import { checkResponse } from '../utils/services.js';

const { VITE_API_URL : baseUrl } = import.meta.env

export const getReleases = async () => {
        const response = await fetch(`${baseUrl}/Release`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    return await checkResponse(response);
}

export const getRelease = async (id) => {
    const response = await fetch(`${baseUrl}/Release/${id}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    return await checkResponse(response);
}

export const getGenresOfRelease = async (releaseId) => {
    const response = await fetch(`${baseUrl}/Release/getGenresOfRelease/${releaseId}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    return await checkResponse(response);
}