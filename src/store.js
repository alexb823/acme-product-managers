import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  products: [],
  users: [],
};

//action types
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const GOT_USERS = 'GOT_USERS';

//action creators
const gotProducts = products => {
  return {
    type: GOT_PRODUCTS,
    products,
  };
};

const gotUsers = users => {
  return {
    type: GOT_USERS,
    users,
  };
};

//thunks
export const fetchProducts = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(response => response.data)
      .then(products => gotProducts(products))
      .then(action => dispatch(action));
  };
};

export const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(response => response.data)
      .then(users => gotUsers(users))
      .then(action => dispatch(action));
  };
};

export const updateProduct = product => {
  return dispatch => {
    return axios
      .put(`/api/products/${product.id}`, product)
      .then(() => dispatch(fetchProducts()));
  };
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return { ...state, products: action.products };
    case GOT_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
};

//helper function to filter users that are product managers
export const findManagers = ({ products, users }) => {
  let managers = [];
  if (products.length && users.length) {
    const managerIds = products.reduce((acc, product) => {
      if (product.managerId) acc.push(product.managerId);
      return acc;
    }, []);
    managers = users.filter(user => managerIds.includes(user.id));
  }
  return managers;
};

const store = createStore(reducer, applyMiddleware(ThunkMiddleware));

export default store;
