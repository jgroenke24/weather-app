import axios from 'axios';

async function getCurrentWeather(city) {
  const result = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      units: 'imperial',
      appid: process.env.API_KEY
    }
  });
  return result.data;
}

async function getForecast(city) {
  const result = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: city,
      units: 'imperial',
      appid: process.env.API_KEY
    }
  });
  return result.data;
}

function handleError (error) {
  console.warn(error);
  return null;
}

export async function getAPIData(city) {
  const results = await Promise.all([
    getCurrentWeather(city),
    getForecast(city)
  ])
  .catch(handleError);
  
  return results;
}