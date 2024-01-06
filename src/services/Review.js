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
