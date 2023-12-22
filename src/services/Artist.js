import { checkResponse } from '../utils/services.js';

const { VITE_API_URL : baseUrl } = import.meta.env

export const getArtists = async () => {
        const response = await fetch(`${baseUrl}/Artist/GetAll`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    return await checkResponse(response);
}

export const getArtist = async (id) => {
    const response = await fetch(`${baseUrl}/Artist/${id}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    return await checkResponse(response);
}

export const createArtist = async (artist) => {
    const response = await fetch(`${baseUrl}/Artist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artist)
    });
    return await checkResponse(response);
}

export const updateArtist = async (artist) => {
    const response = await fetch(`${baseUrl}/Artist`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artist)
    });
    return await checkResponse(response);
}

export const deleteArtist = async (id) => {
    const response = await fetch(`${baseUrl}/Artist/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    });
    return await checkResponse(response);
}