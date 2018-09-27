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
            {moment(day.day).format('dddd, MMM Do')}
          </li>
          <li className='forecast-item'>
            <i className={'wi wi-owm-' + day.id}></i>
          </li>
          <li className='forecast-item'>
            <p>{day.desc}</p>
          </li>
          <li className='forecast-item'>
            <p className='temp'>High: {Math.round(day.tempHi)}<i className='wi wi-degrees'></i></p>
          </li>
          <li className='forecast-item'>
            <p className='temp'>Low: {Math.round(day.tempLo)}<i className='wi wi-degrees'></i></p>
          </li>
          <li className='forecast-item'>
            <p>Humidity: {Math.round((day.humHi + day.humLo) / 2)}</p>
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