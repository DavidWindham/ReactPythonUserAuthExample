import Axios from './axios.service'
import TokenStorage from './token.service'


interface userObject {
    [key: string]: string
}

interface chatMessage {
  [key: string]: string
}

// interface chatMessages{
//   [key: string]: chatMessage
// }

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


export const testRoute = () =>
  Axios
      .post('test',
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )


export const submitChat = (chatMessage:chatMessage) =>
  Axios
      .post(
          'submit_chat_item',
          chatMessage,
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )

export const getChat = () =>
  Axios
      .get(
          'get_chat_items',
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )
