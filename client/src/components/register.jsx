import React, {useState} from 'react';
import {register} from '../services/user.service';
import {useDispatch} from 'react-redux';
import {setUser} from '../actions';

function RegisterComponent() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const submitUserInfo = () => {
    const userObj = {
      username: username,
      nickname: nickname,
      password: password,
      email: email,
    };
    register(userObj, setLoginSuccess);
  };

  const setLoginSuccess = () => {
    dispatch(setUser({username: username}));
  };

  return (
    <div>
      <input placeholder="Username..." type="text"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Nickname..." type="text"
        defaultValue={nickname}
        onChange={(e) => setNickname(e.target.value)} />
      <input placeholder="Password..." type="password"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="Email..." type="email"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => submitUserInfo()}>Register</button>
    </div>
  );
}

export default RegisterComponent;

// export default class RegisterComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.login_value = this.props.login_value;
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeNickname = this.onChangeNickname.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);

//     this.state = {
//       username: '',
//       nickname: '',
//       password: '',
//       email: '',
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value,
//     });
//   }

//   onChangeNickname(e) {
//     this.setState({
//       nickname: e.target.value,
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value,
//     });
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value,
//     });
//   }

//   submitUserInfo() {
//     const userObj = {
//       'username': this.state.username,
//       'nickname': this.state.nickname,
//       'password': this.state.password,
//       'email': this.state.email,
//     };
//     register(userObj);
//   }

//   setLoginSuccess(){
//     dispatchEvent(setUser({username: this.state.username}))
//   }

//   render() {
//     const { login_value } = this.props;
//     return (
//       <div>
//         <input placeholder="Username..." type="text"
//           onChange={this.onChangeUsername} />
//         <input placeholder="Nickname..." type="text"
//           onChange={this.onChangeNickname} />
//         <input placeholder="Password..." type="password"
//           onChange={this.onChangePassword} />
//         <input placeholder="Email..." type="email"
//           onChange={this.onChangeEmail} />
//         <button onClick={() => this.submitUserInfo()}>Register</button>
//       </div>
//     );
//   }
// }

// RegisterComponent.propTypes = {
//   login_value: PropTypes.number.isRequired
// }
