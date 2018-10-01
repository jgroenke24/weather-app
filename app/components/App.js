import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Forecast from './Forecast';
import Day from './Day';

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

export default App;