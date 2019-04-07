import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';

const Products = ({ products }) => {
  return (
    <ul className="list-group">
      {products.map(product => (
        <li className="list-group-item" key={product.id}>
          <Product product={product} />
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Products);
