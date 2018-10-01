import axios from 'axios';

function getCurrentWeather(city) {
  return axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      units: 'imperial',
      appid: process.env.API_KEY
    }
  })
  .then(({ data }) => data);
}

function getForecast(city) {
  return axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: city,
      units: 'imperial',
      appid: process.env.API_KEY
    }
  })
  .then(({ data }) => data);
}

function handleError (error) {
  console.warn(error);
  return null;
}

export function getAPIData(city) {
  return Promise.all([
    getCurrentWeather(city),
    getForecast(city)
  ]).then((data) => data)
  .catch(handleError);
}