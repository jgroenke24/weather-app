var React = require('react');
var axios = require('axios');
var queryString = require('query-string');
var moment = require('moment');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function ForecastGrid(props) {
  return (
    <div className='forecast'>
      <h1 className='city'>
        {props.city}
      </h1>
      <ul className='forecast-list'>
        {props.forecasts.list.filter(function(day) {
          return day.dt_txt.includes('12:00:00');
        }).map(function(day) {
          return (
            <Link
              to={{
                pathname: '/detail/' + props.city,
                search: '?_k=' + day.dt,
                state: {
                  weather: day,
                  city: props.city
                }
              }}
            >
              <ul key={day.dt.toString()} className='forecast-day'>
                <li className='forecast-item'>
                  {moment(day.dt_txt).format('dddd, MMM Do')}
                </li>
                <li className='forecast-item'>
                  <i className={'wi wi-owm-' + day.weather[0].id}></i>
                </li>
              </ul>
            </Link>
          );
        })
         
        }
      </ul>
      <Link
        className='back'
        to={{
          pathname: '/'
        }}
      >
        Go to Homepage
      </Link>
    </div>
  );
}

// Add proptypes
ForecastGrid.propTypes = {
  city: PropTypes.string.isRequired,
  forecasts: PropTypes.object.isRequired
};

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
    var city = queryString.parse(this.props.location.search).city;
    
    if (isLoading) {
      return (
        <div className='loading'>
          Loading
        </div>
      );
    }
    
    return (
      <ForecastGrid forecasts={this.state.data} city={city} />
    );
  }
}

module.exports = Forecast;