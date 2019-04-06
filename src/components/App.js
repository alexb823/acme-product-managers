import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Nav from './Nav';

const App = () => {
  return (
    <div className="container">
      <h1 className="my-4">Acme Product Managers</h1>

      <Router>
        <Route component={Nav} />
      </Router>
    </div>
  )
}

export default App;
