import { checkResponse } from "../utils/services";

const { VITE_API_URL: baseUrl } = import.meta.env;

export const getRating = async (userAndReleaseId) => {
  const response = await fetch(`${baseUrl}/Rating/${userAndReleaseId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    }
  });
  return await checkResponse(response);
}

export const getRatings = async () => {
  const response = await fetch(`${baseUrl}/rating`);
  return checkResponse(response);
};

export const updateRating = async (userAndReleaseIdAndRating) => {
  const response = await fetch(`${baseUrl}/rating/${userAndReleaseIdAndRating}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userAndReleaseIdAndRating),
  });
  return checkResponse(response);
};