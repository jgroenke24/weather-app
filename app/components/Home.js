var React = require('react');
var Header = require('./Header');

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
    console.log(this.state.location);
  }
  render() {
    return (
      <div>
        <Header />
      
        <div className='main'>
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