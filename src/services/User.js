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
