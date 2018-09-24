var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1 className='hero'>
          Enter a City and a State
        </h1>
        <form>
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

module.exports = Home;