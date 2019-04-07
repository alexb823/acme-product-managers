import React from 'react';
import { connect } from 'react-redux';

const Home = ({ haveOpenings }) => {
  return (
    <h5>We{!haveOpenings && "DON'T"} HAVE openings for Product Managers!</h5>
  );
};
const mapStateToProps = state => {
  return {
    haveOpenings: !!state.products.find(product => product.managerId === null),
  };
};
export default connect(mapStateToProps)(Home);

