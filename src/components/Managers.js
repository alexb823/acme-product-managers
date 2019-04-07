import React from 'react';
import { connect } from 'react-redux';
import { findManagers } from '../store';

const Managers = ({ managers }) => {
  return (
    <ul className="list-group">
      {managers.map(manager => (
        <li className="list-group-item" key={manager.id}>
          <h5>{manager.name}</h5>
        </li>
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
