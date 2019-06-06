import React from 'react';
import ReactDOM from 'react-dom';

import DropClass from './DropClass';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.scss';

const App = () => (
  <div className="app" height="100vh">
    <DropClass />
  </div>
);

console.log('process.env.VERSION', process.env.VERSION);
console.log('process.env.PLATFORM', process.env.PLATFORM);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

ReactDOM.render(<App />, document.getElementById('app'));
