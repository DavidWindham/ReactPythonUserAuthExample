import React from 'react';
import {protectedRoute} from '../services/user.service';

export default class ProtectedButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: 'grey',
    };
  }

  callProtectedRoute() {
    this.setButtonNeutral();
    protectedRoute(this.setButtonSuccess, this.setButtonFail);
  }

  setButtonNeutral = () => {
    this.setState({buttonColor: 'grey'});
  };

  setButtonSuccess = () => {
    this.setState({buttonColor: 'green'});
    setTimeout(this.setButtonNeutral, 1000);
  };

  setButtonFail = () => {
    this.setState({buttonColor: 'red'});
    setTimeout(this.setButtonNeutral, 1000);
  };

  render() {
    return (
      <div>
        <h3>Click the protected button below to test login status</h3>
        <button onClick={() => this.callProtectedRoute()}
          style={{'backgroundColor': this.state.buttonColor}}>
          Call Protected Route
        </button>
      </div>
    );
  }
}
