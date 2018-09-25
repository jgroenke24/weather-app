var React = require('react');
var moment = require('moment');
var Link = require('react-router-dom').Link

class Day extends React.Component {
  render() {
    var day = this.props.location.state.weather;
    var city = this.props.location.state.city;
    return (
      <div className='forecast detail'>
        <h1 className='city'>
          {city}
        </h1>
        <ul className='forecast-day'>
          <li className='forecast-item'>
            {moment(day.dt_txt).format('dddd, MMM Do')}
          </li>
          <li className='forecast-item'>
            <i className={'wi wi-owm-' + day.weather[0].id}></i>
          </li>
          <li className='forecast-item'>
            <p>{day.weather[0].description}</p>
          </li>
          <li className='forecast-item'>
            <p className='temp'>Temp: {Math.round(day.main.temp)}<i className='wi wi-degrees'></i></p>
          </li>
          <li className='forecast-item'>
            <p>Humidity: {day.main.humidity}</p>
          </li>
          <li className='forecast-item'>
            <Link
              className='back'
              to={{
                pathname: '/'
              }}
            >
              Go to Homepage
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

module.exports = Day;