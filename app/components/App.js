var React = require('react');
var Home = require('./Home.js');

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Home />
      </div>
    );
  }
}

module.exports = App;