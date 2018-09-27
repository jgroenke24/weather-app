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
    console.log('inside getCurrentWeather', response.data);
    return response.data;
  });
}

function getForecast(city) {
  // Get forecast
  return axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: city,
      units: 'imperial',
      appid: process.env.API_KEY
    }
  })
  .then(function(response) {
    console.log('inside getForecast', response.data);
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
      console.log('inside getAPI data', data);
      return data;
    }).catch(handleError);
  }
};