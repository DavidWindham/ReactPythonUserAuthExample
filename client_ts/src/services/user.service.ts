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

export const changePassword = (changePasswordUserObj:userObject) =>
  Axios
      .post(
          'change_password',
          changePasswordUserObj,
          {
            headers: TokenStorage.getAuthenticationAndRefresh().headers,
          },
      )

export const forgotPassword = (forgotUserObj:userObject) =>
  Axios
      .post(
          'forgot_password_request',
          forgotUserObj,
      )

export const resetPassword = (resetPasswordObj:userObject) =>
  Axios
      .post(
          'forgot_password_change',
          resetPasswordObj,
      )

export const protectedRoute = () =>
  Axios
      .get(
          'protected',
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )
