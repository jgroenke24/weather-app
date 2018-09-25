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
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      location: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    // Get current weather
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: this.state.location,
        appid: process.env.API_KEY
      }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
      
    // Get forecast
    // axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    //   params: {
    //     q: this.state.location,
    //     appid: 'f3d0fb9e081c7ae60b687cade62a59d8'
    //   }
    // })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(response) {
    //     console.log(response);
    //   });
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