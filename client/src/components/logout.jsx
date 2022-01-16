import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../services/user.service';
import {setUser} from '../actions';

function Logout() {
  const dispatch = useDispatch();

  const logoutUser = () => {
    logout(changeToRegister);
  };

  const changeToRegister = () => {
    dispatch(setUser(null));
  };

  return (
    <div>
      <button onClick={() => logoutUser()}>Logout</button>
    </div>
  );
}

export default Logout;
