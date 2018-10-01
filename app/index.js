const React = require('react');
const ReactDOM = require('react-dom');
require('./css/index.css');
require('./css/weather-icons.min.css');
const App = require('./components/App');


ReactDOM.render(
  <App />,
  document.getElementById("app")
);