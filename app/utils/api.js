var axios = require('axios');

function getCurrentWeather(city) {
  return axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      units: 'imperial',
      appid: process.env.API_KEY
    }
  })
  .then(function(response) {
    return response.data;
  });
}

function getForecast(city) {
  return axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: city,
      units: 'imperial',
      appid: process.env.API_KEY
    }
  })
  .then(function(response) {
    return response.data;
  });
}

function handleError (error) {
  console.warn(error);
  return null;
}

module.exports = {
  getAPIData: function(city) {
    return axios.all([
      getCurrentWeather(city),
      getForecast(city)
    ]).then(function(data) {
      return data;
    }).catch(handleError);
  }
};