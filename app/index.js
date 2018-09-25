var React = require('react');
var ReactDOM = require('react-dom');
require('./css/index.css');
require('./css/weather-icons.min.css');
var App = require('./components/App');


ReactDOM.render(
  <App />,
  document.getElementById("app")
);