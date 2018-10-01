const moment = require('moment');

function formatAPIData(data) {

let checkDayString = '';
let accIndex = -1;
/* 
  Forecast array returned from openweathermap API shows the weather for the next 5 days for every
  3 hours.
  The following trims down that array to each day's high/low temperatures and humidity and other info.
*/
let newArray = data.reduce((acc, curr) => {
  let dayString = curr.dt_txt.slice(0,10);
  
  // If the day's forecast date is today's date, skip it
  if (dayString === moment().format('YYYY-MM-DD')) {
    return acc;
  }

  // If an object for that day exist, update the existing data
  if (checkDayString === dayString) {
    let temp = curr.main.temp;
    let hum = curr.main.humidity;
    
    // Update high temperature
    if (temp > acc[accIndex].tempHi) {
      acc[accIndex].tempHi = temp;
    }
    
    // Update low temperature
    if (temp < acc[accIndex].tempLo) {
      acc[accIndex].tempLo = temp;
    }
    
    // Update high humidity
    if (hum > acc[accIndex].humHi) {
      acc[accIndex].humHi = hum;
    }
    
    // Update low humidity
    if (hum < acc[accIndex].humLo) {
      acc[accIndex].humLo = hum;
    }
    
    return acc;
  }
  
  // Object for day does not exist yet so create it within array
  let dayObj = {};
  dayObj.day = dayString;
  dayObj.tempHi = curr.main.temp;
  dayObj.tempLo = curr.main.temp;
  dayObj.humHi = curr.main.humidity;
  dayObj.humLo = curr.main.humidity;
  dayObj.desc = curr.weather[0].description;
  dayObj.id = curr.weather[0].id;
  
  acc.push(dayObj);
  checkDayString = dayString;
  accIndex += 1;
  
  return acc;
}, []);

return newArray;
}

module.exports = {
  formatData: formatAPIData
};