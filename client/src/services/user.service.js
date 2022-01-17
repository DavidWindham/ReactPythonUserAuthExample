import Axios from './axios.service';
import TokenStorage from './token.service';


export const register = (userObj) =>
  Axios
      .post(
          'register',
          userObj,
      );

export const login = (userObj) =>
  Axios
      .post(
          'login',
          userObj,
      );

export const logout = () =>
  Axios
      .get(
          'logout',
          {
            headers: TokenStorage.getAuthenticationAndRefresh().headers,
          },
      );


export const protectedRoute = () =>
  Axios
      .get(
          'protected',
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      );
