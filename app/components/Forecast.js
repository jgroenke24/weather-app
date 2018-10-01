import React from 'react';
import queryString from 'query-string';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatAPIData } from '../utils/helper';
import { getAPIData } from '../utils/api';

function CurrentWeather(props) {
  const { current } = props;
  return (
    <div className='currently'>
      <div className='currently-temp'>
        <p>Right Now:</p>
        <p className='currently-temp-num'>{Math.round(current.main.temp)}<i className='wi wi-degrees'></i></p>
      </div>
      <div className='currently-icon'>
        <i className={'wi wi-owm-' + current.weather[0].id}></i>
      </div>
    </div>
  );
}

CurrentWeather.propTypes = {
  current: PropTypes.object.isRequired
};

function ForecastGrid(props) {
  const { city, current, forecasts } = props;
  return (
    <div className='forecast'>
      <h1 className='city'>
        {city}
      </h1>
      <CurrentWeather current={current} />
      <ul className='forecast-list'>
        {forecasts.map(function(day) {
          return (
            <Link
              key={day.day}
              className='forecast-link'
              to={{
                pathname: '/detail/' + city,
                search: '?_k=' + day.day,
                state: {
                  weather: day,
                  city: city
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

ForecastGrid.propTypes = {
  city: PropTypes.string.isRequired,
  forecasts: PropTypes.array.isRequired,
  current: PropTypes.object.isRequired
};

class Forecast extends React.Component {
  state = {
    isLoading: true,
    error: null,
    currentWeather: null,
    data: null
  }
  componentDidMount() {

    // Get city from query
    const { city } = queryString.parse(this.props.location.search);
    
    getAPIData(city)
      .then((results) => {
        if (results === null) {
          return this.setState(() => ({
            error: 'There was an error completing your request.  Try the entire state name instead of the abbreviation. :)',
            isLoading: false
          }));
        }
        
        const forecasts = formatAPIData(results[1].list);
        this.setState(() => ({
          data: forecasts,
          currentWeather: results[0],
          isLoading: false
        }));
      });
  }
  render() {
    const { isLoading, error, data, currentWeather } = this.state;
    const { city } = queryString.parse(this.props.location.search);
    
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
      <ForecastGrid forecasts={data} current={currentWeather} city={city} />
    );
  }
}

export default Forecast;