import {render} from '@testing-library/react';
import React from 'react';
import {useSelector} from 'react-redux';

export const Wrapper = ({children}) => {
  const {user} = useSelector((state) => state.userReducer);
  if (!user) {
    return <></>;
  }
  return (
    <>{children}</>
  );
};

function UserStateComponent() {
  const {user} = useSelector((state) => state.userReducer);

  return (
    <div id="ILikeThisHere">
      <h2>User is logged in, {user.username}</h2>
    </div>
  );
}

export default UserStateComponent;
