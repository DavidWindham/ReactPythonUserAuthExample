import Axios from './axios.service'
import TokenStorage from './token.service'


interface userObject {
    [key: string]: string
}

export const register = (registerUserObj:userObject) =>
  Axios
      .post(
          'register',
          registerUserObj,
      )

export const login = (loginUserObj:userObject) =>
  Axios
      .post(
          'login',
          loginUserObj,
      )

export const logout = () =>
  Axios
      .get(
          'logout',
          {
            headers: TokenStorage.getAuthenticationAndRefresh().headers,
          },
      )

export const protectedRoute = () =>
  Axios
      .get(
          'protected',
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )
