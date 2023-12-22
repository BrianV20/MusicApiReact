export const checkResponse = (response) => {
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, status text: ${response.statusText}, url: ${response.url}`);
    return;
  }

  return response.json();
};