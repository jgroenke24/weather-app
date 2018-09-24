var React = require('react');
var Header = require('./Header');

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
      
        <div className='main'>
          <h1 className='hero'>
            Enter a City and a State
          </h1>
          <form className='form-main'>
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
      </div>
    );
  }
}

module.exports = Home;