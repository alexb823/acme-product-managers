import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      manager: this.findManager(product, users) || {},
      managerName: this.findManagerName(product, users),
      error: '',
    };
  };

  findManager = (product, users) => {
    return users.find(user => user.id === product.managerId);
  };

  findManagerName = (product, users) => {
    let name = '--none--';
    if (product.managerId && users.length) {
      name = users.find(user => user.id === product.managerId).name;
    }
    return name;
  };

  componentDidUpdate = prevProps => {
    // console.log(this.props)
    // console.log(prevProps)
    if (this.props.users.length && !prevProps.users.length) {
      this.setState(this.setInitialState(this.props));
    }
  };

  handleOnChange = ({ target }) => {
    this.setState({ managerName: target.value });
  };

  render() {
    const { product, manager, managerName } = this.state;
    const { users } = this.props;
    const { handleOnChange } = this;
    const currentManagerName = manager.name || '--none--';

    return (
      <div>
        <h5>{product.name}</h5>
        <form>
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

export default connect(mapStateToProps)(Product);
