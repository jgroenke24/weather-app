var React = require('react');
var axios = require('axios');
var queryString = require('query-string');
var moment = require('moment');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var helper = require('../utils/helper');
var api = require('../utils/api');

function CurrentWeather(props) {
  return (
    <div className='currently'>
      <div className='currently-temp'>
        <p>Right Now:</p>
        <p className='currently-temp-num'>{Math.round(props.current.main.temp)}<i className='wi wi-degrees'></i></p>
      </div>
      <div className='currently-icon'>
        <i className={'wi wi-owm-' + props.current.weather[0].id}></i>
      </div>
    </div>
  );
}

CurrentWeather.propTypes = {
  current: PropTypes.object.isRequired
};

function ForecastGrid(props) {
  return (
    <div className='forecast'>
      <h1 className='city'>
        {props.city}
      </h1>
      <CurrentWeather current={props.current} />
      <ul className='forecast-list'>
        {props.forecasts.map(function(day) {
          return (
            <Link
              key={day.day}
              className='forecast-link'
              to={{
                pathname: '/detail/' + props.city,
                search: '?_k=' + day.day,
                state: {
                  weather: day,
                  city: props.city
                }
              }}
            >
              <ul className='forecast-day'>
                <li className='forecast-item'>
                  {moment(day.day).format('dddd, MMM Do')}
                </li>
                <li className='forecast-item'>
                  <i className={'wi wi-owm-' + day.id}></i>
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
  forecasts: PropTypes.array.isRequired,
  current: PropTypes.object.isRequired
};

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      error: null,
      currentWeather: null,
      data: null
    };
  }
  componentDidMount() {

    // Get city from query
    var city = queryString.parse(this.props.location.search).city;
    
    api.getAPIData(city)
      .then(function(results) {
        if (results === null) {
          return this.setState(function() {
            return {
              error: 'There was an error completing your request.  Try the entire state name instead of the abbreviation. :)',
              isLoading: false
            };
          });
        }
        
        var forecasts = helper.formatData(results[1].list);
        this.setState(function() {
          return {
            data: forecasts,
            currentWeather: results[0],
            isLoading: false
          };
        });
      }.bind(this));
  }
  render() {
    var isLoading = this.state.isLoading;
    var error = this.state.error;
    var city = queryString.parse(this.props.location.search).city;
    
    if (isLoading) {
      return (
        <div className='loading'>
          Loading
        </div>
      );
    }
    
    if (error) {
      return (
        <div className='error'>
          {error}
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
    
    return (
      <ForecastGrid forecasts={this.state.data} current={this.state.currentWeather} city={city} />
    );
  }
}

module.exports = Forecast;