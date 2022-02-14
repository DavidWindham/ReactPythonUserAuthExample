import Axios from './axios.service'
import TokenStorage from './token.service'

interface chatMessage {
    [key: string]: string
  }

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

export const updateChat = (idArray:number[]) =>
  Axios
      .post(
          'update_chat_items',
          {'id_array': idArray},
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )
