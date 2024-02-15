import { checkResponse } from "../utils/services";

const { VITE_API_URL: baseUrl } = import.meta.env;

export const getReviews = async () => {
  const response = await fetch(`${baseUrl}/Review`, {
    headers: {
      Accept: "application/json",
    },
  });
  return await checkResponse(response);
};

export const getReview = async (id) => {
  const response = await fetch(`${baseUrl}/Review/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return await checkResponse(response);
};

export const addReview = async (reviewInfo) => {
  const response = await fetch(`${baseUrl}/Review/${reviewInfo}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewInfo),
  });
  // return await checkResponse(response);
  return await response;
}