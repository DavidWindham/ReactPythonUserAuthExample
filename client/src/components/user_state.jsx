import React from 'react';
import {useSelector} from 'react-redux';


function UserStateComponent() {
  const {user} = useSelector((state) => state.userReducer);

  return (
    <div>
      {user ?
                (<h2>User is logged in, {user.username}</h2>) :
                <h2>User is not logged in</h2>
      }
    </div>
  );
}

export default UserStateComponent;
