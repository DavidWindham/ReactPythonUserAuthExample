import React from 'react';
import {useSelector} from 'react-redux';

function UserStateComponent() {
  const {user} = useSelector((state) => state.userReducer);

  return (
    <h2>User is logged in, {user.username}</h2>
  );
}

export default UserStateComponent;
