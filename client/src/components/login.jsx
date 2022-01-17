import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setUser} from '../actions';
import {login} from '../services/user.service';
import TokenStorage from '../services/token.service';


function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = () => {
    const userObj = {
      username: username,
      password: password,
    };

    login(userObj, setLoginSuccess)
        .then((res)=>{
          TokenStorage.storeTokens(res.data);
          setLoginSuccess();
        })
        .catch((error) => {
          console.log('Error caught in login: ', error);
        }); ;
  };

  const setLoginSuccess = () => {
    dispatch(setUser({username: username}));
  };

  return (
    <div>
      <input placeholder="Username..."
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)} type="text"
      />
      <input placeholder="Password..."
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)} type="password"
      />
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
}

export default LoginComponent;
