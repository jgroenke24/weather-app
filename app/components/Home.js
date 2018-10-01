import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  state = {
    location: ''
  }
  handleChange = (event) => {
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

export default Home;