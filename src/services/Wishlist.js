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

export const addReleaseToWishlist = async (Wishlist) => {
  const response = await fetch(`${baseUrl}/WishList/AddRelease`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Wishlist),
  });
  return await checkResponse(response);
};

export const deleteReleaseFromWishlist = async (id) => {
  const response = await fetch(`${baseUrl}/WishList/RemoveRelease${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  });
  return await checkResponse(response);
};
