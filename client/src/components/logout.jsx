import React from 'react';
import {logout} from '../services/user.service';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  logoutUser() {
    //logout(this.props.onLogout);
    logout();
  }

  render() {
    return (
      <div>
        <h1>Logout</h1>
        <button onClick={() => this.logoutUser()}>Logout</button>
      </div>
    );
  }
}
