import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../services/user.service';
import {setUser} from '../actions';
import TokenStorage from '../services/token.service';


function Logout() {
  const dispatch = useDispatch();

  const logoutUser = () => {
    logout()
        .then((res) => {
          TokenStorage.clear();
          changeToRegister();
        })
        .catch((error) => {
          console.log(error);
        });
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
