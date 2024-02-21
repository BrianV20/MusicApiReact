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

export const updateUser = async (id, data) => {
  const response = await fetch(`${baseUrl}/User/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, ...data})
  });
  return await checkResponse(response);
}

export const login = async (data) => {
  const response = await fetch(`${baseUrl}/User/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return await checkResponse(response);
};

export const LikeRelease = async (data) => {
  const response = await fetch(`${baseUrl}/User/${data}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return await checkResponse(response);
};

export const GetLikedReleases = async (userId) => {
  const response = await fetch(`${baseUrl}/User/GetLikedReleasesByUserId/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return await checkResponse(response);
}

export const GetUserFromToken = async () => {
  const response = await fetch(`${baseUrl}/User/GetUserFromToken`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return await checkResponse(response);
}

//SE SUPONE QUE EL METODO LOGIN DEL UserController de la api genera el token y lo devuelve. Ver como seguir con esto, es decir
// ver que hacer con el token y qué devuelve en sí el metodo.