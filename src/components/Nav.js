import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {findManagers} from '../store';

const Nav = ({ location, managers }) => {
  const navPills = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Managers', path: '/managers', numManagers: 1 },
  ];

  return (
    <ul className="nav nav-pills mb-4">
      {navPills.map(navPill => (
        <li className="nav-item" key={navPill.name}>
          <Link
            className={`nav-link ${
              location.pathname === navPill.path ? 'active' : ''
            }`}
            to={navPill.path}
          >
            {navPill.name} {navPill.numManagers && `(${navPill.numManagers})`}
          </Link>
        </li>
      ))}
    </ul>
  );
};



export default Nav;
