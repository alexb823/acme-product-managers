import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location }) => {
  console.log(location);
  const navPills = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Managers', path: '/managers' },
  ];

  return (
    <ul className="nav nav-pills">
      {navPills.map(navPill => (
        <li className="nav-item" key={navPill.name}>
          <Link
            className={`nav-link ${
              location.pathname === navPill.path ? 'active' : ''
            }`}
            to={navPill.path}
          >
            {navPill.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
