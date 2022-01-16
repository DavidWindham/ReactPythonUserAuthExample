import Axios from './axios.service';
import TokenStorage from './token.service';


export const register = (userObj, callback) =>
  Axios
      .post(
          'register',
          userObj,
      )
      .then((res)=>{
        login(userObj, callback);
      })
      .catch((error) => {
        console.log('Error caught in register: ', error);
      });

export const login = (userObj, callback) =>
  Axios
      .post(
          'login',
          userObj,
      )
      .then((res)=>{
        TokenStorage.storeTokens(res.data);
        callback();
      })
      .catch((error) => {
        console.log(error);
      });

export const logout = (callback) =>
  Axios
      .get(
          'logout',
          {
            headers: TokenStorage.getAuthenticationAndRefresh().headers,
          },
      )
      .then((res) => {
        TokenStorage.clear();
        callback();
      })
      .catch((error) => {
        console.log(error);
      });

export const protectedRoute = (successCallback, failCallback) =>
  Axios
      .get(
          'protected',
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )
      .then((res) => {
        console.log(res);
        // If 401, this fails triggering the error catch
        if (typeof res !== 'undefined') {
          successCallback();
        } else {
          failCallback();
        }
      })
      .catch((error) => {
        console.log('Error on protected route: ', error);
      });
