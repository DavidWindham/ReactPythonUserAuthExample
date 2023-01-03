import Axios from './axios.service'
import TokenStorage from './token.service'
import {ChatMessageToSend} from '../interfaces/chat.interfaces'

export const submitChat = (chatMessage:ChatMessageToSend) =>
  Axios
      .post(
          'chat/submit_chat_item',
          chatMessage,
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )

export const getChat = () =>
  Axios
      .get(
          'chat/get_chat_items',
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )

export const updateChat = (idArray:number[]) =>
  Axios
      .post(
          'chat/update_chat_items',
          {'id_array': idArray},
          {
            headers: TokenStorage.getAuthentication().headers,
          },
      )
