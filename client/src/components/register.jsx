import React from 'react';
import {register} from '../services/user.service';
import PropTypes from 'prop-types'


export default class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.login_value = this.props.login_value;
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeNickname = this.onChangeNickname.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.state = {
      username: '',
      nickname: '',
      password: '',
      email: '',
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeNickname(e) {
    this.setState({
      nickname: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  submitUserInfo() {
    const userObj = {
      'username': this.state.username,
      'nickname': this.state.nickname,
      'password': this.state.password,
      'email': this.state.email,
    };
    register(userObj);
  }

  render() {
    const { login_value } = this.props;
    return (
      <div>
        <h1>Register</h1>
        <h2>Test value: {login_value} END</h2>
        <input placeholder="Username..." type="text"
          onChange={this.onChangeUsername} />
        <input placeholder="Nickname..." type="text"
          onChange={this.onChangeNickname} />
        <input placeholder="Password..." type="password"
          onChange={this.onChangePassword} />
        <input placeholder="Email..." type="email"
          onChange={this.onChangeEmail} />
        <button onClick={() => this.submitUserInfo()}>Register</button>
      </div>
    );
  }
}

RegisterComponent.propTypes = {
  login_value: PropTypes.number.isRequired
}
