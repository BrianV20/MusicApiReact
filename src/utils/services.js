export const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return response.text().then(text => {
      return text ? JSON.parse(text) : {}
    })
  }
};

export const extractYear = (date) => {
  if(date.split('/')[2] <= 30) {
    return '20' + date.split('/')[2];
  }
  else {
    return '19' + date.split('/')[2];
  }
}