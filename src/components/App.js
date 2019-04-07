import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchProducts, fetchUsers } from '../store';
import Nav from './Nav';
import Home from './Home';
import Products from './Products';

class App extends Component {
  componentDidMount() {
    Promise.all([
      this.props.fetchProducts(),
      this.props.fetchUsers()
    ])
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div className="container">
        <h1 className="my-4">Acme Product Managers</h1>

        <Router>
          <Route component={Nav} />
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(null, mapDispatchToProps)(App);
