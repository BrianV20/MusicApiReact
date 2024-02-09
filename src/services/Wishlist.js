import { checkResponse } from "../utils/services";

const { VITE_API_URL: baseUrl } = import.meta.env;

export const getWishlists = async () => {
  const response = await fetch(`${baseUrl}/WishList`, {
    headers: {
      Accept: "application/json",
    },
  });
  return await checkResponse(response);
};

export const getWishlistByUser = async (id) => {
  const response = await fetch(`${baseUrl}/WishList/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return await checkResponse(response);
};

export const addReleaseToWishlist = async (userAndReleaseId) => {
  const response = await fetch(`${baseUrl}/WishList/AddRelease/${userAndReleaseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userAndReleaseId),
  });
  return await checkResponse(response);
};

export const deleteReleaseFromWishlist = async (userAndReleaseId) => {
  const response = await fetch(`${baseUrl}/WishList/RemoveRelease/${userAndReleaseId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(userAndReleaseId),
  });
  return await checkResponse(response);
};
