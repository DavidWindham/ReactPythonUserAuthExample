export type ChatMessage = {
  id: number,
  username: string,
  message: string,
  timestamp: string,
}

export type ChatMessages = ChatMessage[]

export interface ChatMessageToSend {
  [key: string]: string
}
