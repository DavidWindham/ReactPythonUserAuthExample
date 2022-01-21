import React from 'react';
import {protectedRoute} from '../services/user.service';
import {setUser} from '../actions';
import {buttonSetFailure, buttonSetSuccess, buttonSetNeutral} from '../actions';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';


function ProtectedButton() {
  const {buttonColor} = useSelector((state) => state.buttonStatusReducer);
  const dispatch = useDispatch();

  const callProtectedRoute = () => {
    protectedRoute()
        .then((res) => {
        // If 401, this fails triggering the error catch
          if (typeof res !== 'undefined') {
            setButtonSuccess();
          } else {
            setButtonFail();
            dispatch(setUser(null));
          }
        })
        .catch((error) => {
          console.log('Error on protected route: ', error);
        });
  };

  const setButtonNeutral = () => {
    dispatch(buttonSetNeutral());
  };

  const setButtonSuccess = () => {
    dispatch(buttonSetSuccess());
    setTimeout(setButtonNeutral, 1000);
  };

  const setButtonFail = () => {
    dispatch(buttonSetFailure());
    setTimeout(setButtonNeutral, 1000);
  };

  return (
    <div>
      <h3>Click the protected button below to test login status</h3>
      <button onClick={() => callProtectedRoute()}
        style={{'backgroundColor': buttonColor}}>
        Call Protected Route
      </button>
    </div>
  );
}

export default ProtectedButton;
