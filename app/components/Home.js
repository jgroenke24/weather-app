const React = require('react');
const Link = require('react-router-dom').Link;

class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      location: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState(() => ({ location: value }));
  }
  render() {
    const { location } = this.state;
    
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
            value={location}
            onChange={this.handleChange}
          />
          
          <Link
            className='button'
            to={{
              pathname: '/forecast',
              search: '?city=' + encodeURIComponent(location)
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