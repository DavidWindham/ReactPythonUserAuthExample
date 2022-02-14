import Axios from './axios.service'
import TokenStorage from './token.service'
import {chatMessageInterface} from '../interfaces/chat.interfaces'


export const submitChat = (chatMessage:chatMessageInterface) =>
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
