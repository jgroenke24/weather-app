var React = require('react');
var axios = require('axios');
var queryString = require('query-string');
var moment = require('moment');

function ForecastGrid(props) {
  
  return (
    <div className='main'>
      <h1 className='hero'>
        {props.forecasts.city.name}
      </h1>
      <ul className='forecast-list'>
        {props.forecasts.list.filter(function(day) {
          return day.dt_txt.includes('12:00:00');
        }).map(function(day, index) {
          return (
            <ul key={index} className='forecast'>
              <li className='forecast-item'>
                {moment(day.dt_txt).format('dddd')}
              </li>
              <li className='forecast-item'>
                <img 
                  className='forecast-icon'
                  src={'https://openweathermap.org/img/w/' + day.weather[0].icon + '.png'}
                  alt={day.weather[0].description}
                />
              </li>
              <li className='forecast-item'>
                <p className='temp'>
                  {Math.round(day.main.temp)}
                </p>
              </li>
            </ul>
          );
        })
         
        }
      </ul>
    </div>
  );
}

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      data: null
    };
  }
  componentDidMount() {

    // Get city from query
    var city = queryString.parse(this.props.location.search).city;
    
    // Get current weather
    // axios.get('https://api.openweathermap.org/data/2.5/weather', {
    //   params: {
    //     q: city,
    //     appid: process.env.API_KEY
    //   }
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //     this.setState(function() {
    //       return {
    //         data: response.data,
    //         isLoading: false
    //       };
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
      
    // Get forecast
    axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: city,
        units: 'imperial',
        appid: process.env.API_KEY
      }
    })
    .then((response) => {
      console.log(response.data);
      this.setState(function() {
        return {
          data: response.data,
          isLoading: false
        };
      });
    })
    .catch(function(response) {
      console.log(response);
    });
  }
  render() {
    var isLoading = this.state.isLoading;
    
    if (isLoading) {
      return (
        <div>
          Loading
        </div>
      );
    }
    
    return (
      <ForecastGrid forecasts={this.state.data} />
    );
  }
}

module.exports = Forecast;