var React = require('react');

class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <div className='logo'>
          WeatherApp
        </div>
        <form className='form-header'>
          <input
            type='text'
            placeholder='St. George, Utah'
            autoComplete='off'
          />
          <button
            className='button'
            type='submit'
          >
            Get Weather
          </button>
        </form>
      </div>
    );
  }
}

module.exports = Header;