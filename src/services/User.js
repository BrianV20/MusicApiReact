import { checkResponse } from "../utils/services";

const { VITE_API_URL: baseUrl } = import.meta.env;

export const getUsers = async () => {
  const response = await fetch(`${baseUrl}/User`, {
    headers: {
      Accept: "application/json",
    },
  });
  return await checkResponse(response);
};

export const getUser = async (id) => {
  const response = await fetch(`${baseUrl}/User/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return await checkResponse(response);
};

export const createUser = async (data) => {
  const response = await fetch(`${baseUrl}/User`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return await checkResponse(response);
}