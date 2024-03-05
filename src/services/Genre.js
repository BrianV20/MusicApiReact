import { checkResponse } from "../utils/services";

const { VITE_API_URL : baseUrl } = import.meta.env

export const getGenre = async (id) => {
    const response = await fetch(`${baseUrl}/Genre/${id}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    return await checkResponse(response);
}