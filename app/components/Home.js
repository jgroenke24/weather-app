var React = require('react');
var axios = require('axios');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      location: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      location: event.target.value
    });
  }
  render() {
    return (
      <div className='home'>
        <h1 className='hero'>
          Enter a City and a State
        </h1>
        <form 
          className='form-main'
          onSubmit={this.handleSubmit}
        >
          <input
            type='text'
            placeholder='St. George, Utah'
            autoComplete='off'
            value={this.state.location}
            onChange={this.handleChange}
          />
          
          <Link
            className='button'
            to={{
              pathname: '/forecast',
              search: '?city=' + encodeURIComponent(this.state.location)
            }}
          >
            Get Weather
          </Link>
        </form>
      </div>
    );
  }
}

module.exports = Home;