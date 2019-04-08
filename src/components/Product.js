import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../store';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = this.setInitialState(this.props);
  }

  setInitialState = ({ product, users }) => {
    return {
      product: {
        id: product.id || '',
        name: product.name || '',
        managerId: product.managerId || '',
      },
      currentManagerName: this.setManagerName(product, users),
      managerName: this.setManagerName(product, users),
      error: '',
    };
  };

  setManagerName = (product, users) => {
    let name = '--none--';
    if (product.managerId && users.length) {
      name = users.find(user => user.id === product.managerId).name;
    }
    return name;
  };

  componentDidUpdate = prevProps => {
    if (
      (this.props.users.length && !prevProps.users.length) ||
      this.props.product.managerId !== prevProps.product.managerId
    ) {
      this.setState(this.setInitialState(this.props));
    }
  };

  handleOnChange = ({ target }) => {
    this.setState({ managerName: target.value });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const { users, updateProduct } = this.props;
    const { product } = this.state;
    const manager = users.find(user => user.name === this.state.managerName);
    if (manager) product.managerId = manager.id;
    else product.managerId = null;
    updateProduct(product)
    .catch(ex => this.setState({ error: ex.response.data }))
    .then(() => console.log(this.state.error))
  };

  render() {
    const { product, currentManagerName, managerName } = this.state;
    const { users } = this.props;
    const { handleOnChange, handleOnSubmit } = this;

    return (
      <div>
        <h5>{product.name}</h5>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label>Product Manager</label>
            <select
              className="form-control"
              value={managerName}
              onChange={handleOnChange}
            >
              <option>--none--</option>
              {users.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={currentManagerName === managerName}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: product => dispatch(updateProduct(product)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
