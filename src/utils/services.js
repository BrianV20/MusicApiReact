export const checkResponse = (response) => {
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, status text: ${response.statusText}, url: ${response.url}`);
    return;
  }

  return response.json();
};

export const extractYear = (date) => {
  if(date.split('/')[2] <= 30) {
    return '20' + date.split('/')[2];
  }
  else {
    return '19' + date.split('/')[2];
  }
}