import Axios from './axios.service'
import TokenStorage from './token.service'


interface userObject {
    [key: string]: string
}

export const register = (registerUserObj:userObject) =>
  Axios
      .post(
          'auth/register',
          registerUserObj,
      )

export const login = (loginUserObj:userObject) =>
  Axios
      .post(
          'auth/login',
          loginUserObj,
      )

export const logout = () =>
  Axios
      .get(
          'auth/logout',
          {
            headers: TokenStorage.getAuthenticationAndRefresh().headers,
          },
      )

export const changePassword = (changePasswordUserObj:userObject) =>
  Axios
      .post(
          'auth/change_password',
          changePasswordUserObj,
          {
            headers: TokenStorage.getAuthenticationAndRefresh().headers,
          },
      )

export const forgotPassword = (forgotUserObj:userObject) =>
  Axios
      .post(
          'auth/forgot_password_request',
          forgotUserObj,
      )

export const resetPassword = (resetPasswordObj:userObject) =>
  Axios
      .post(
          'auth/forgot_password_change',
          resetPasswordObj,
      )

export const protectedRoute = () =>
  Axios
      .get(
          'auth/protected',
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )
