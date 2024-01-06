import { checkResponse } from "../utils/services";

const { VITE_API_URL: baseUrl } = import.meta.env;

export const getRating = async (releaseId, userId) => {
    let ratings = await fetch(`${baseUrl}/rating`);
    ratings = await ratings.json();
    let rating = ratings.find((r) => r.releaseId === releaseId && r.userId === userId);
    return rating;
}

export const getRatings = async () => {
  const response = await fetch(`${baseUrl}/rating`);
  return checkResponse(response);
};
