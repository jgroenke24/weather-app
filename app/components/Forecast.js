var React = require('react');
var axios = require('axios');
var queryString = require('query-string');

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
    
    // Get current weather
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
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
      .catch(function(error) {
        console.log(error);
      });
      
    // Get forecast
    // axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    //   params: {
    //     q: city,
    //     appid: process.env.API_KEY
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
    var isLoading = this.state.isLoading;
    
    if (isLoading) {
      return (
        <div>
          Loading
        </div>
      );
    }
    
    return (
      <div>
        this is the forecast data
      </div>
    );
  }
}

module.exports = Forecast;