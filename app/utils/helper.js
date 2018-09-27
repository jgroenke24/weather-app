function formatAPIData(data) {

var checkDayString = '';
var accIndex = -1;
/* 
  Forecast array returned from openweathermap API shows the weather for the next 5 days for every
  3 hours.
  The following trims down that array to each day's high/low temperatures and humidity and other info.
*/
var newArray = data.reduce((acc, curr) => {
  var dayString = curr.dt_txt.slice(0,10);

  // If an object for that day exist, update the existing data
  if (checkDayString === dayString) {
    var temp = curr.main.temp;
    var hum = curr.main.humidity;
    
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
  var dayObj = {};
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