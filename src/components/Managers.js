import React from 'react';
import { connect } from 'react-redux';
import { findManagers } from '../store';

const Managers = ({ managers }) => {
  return (
    <ul>
      {managers.map(manager => (
        <li key={manager.id}>{manager.name}</li>
      ))}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    managers: findManagers(state),
  };
};

export default connect(mapStateToProps)(Managers);
