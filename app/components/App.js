var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Header = require('./Header');
var Home = require('./Home');
var Forecast = require('./Forecast');
var Day = require('./Day');

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Header />
        <Router>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/forecast' component={Forecast}/>
            <Route path='/detail/:day' component={Day}/>
            <Route render={function() {
              return <p>Not Found</p>;
            }} />
          </Switch>
        </Router>
      </div>
    );
  }
}

module.exports = App;