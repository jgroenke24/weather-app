const React = require('react');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;
const Header = require('./Header');
const Home = require('./Home');
const Forecast = require('./Forecast');
const Day = require('./Day');

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
              return <div className='error'>Page not found</div>;
            }} />
          </Switch>
        </Router>
      </div>
    );
  }
}

module.exports = App;