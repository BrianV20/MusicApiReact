export const checkResponse = (response) => {
  if (!response.ok) {
    // throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
    return response.text().then(text => {
      return console.error(text ? JSON.parse(text) : {})
      // return text ? JSON.parse(text) : {}
    })
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