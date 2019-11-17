import { MessageItemState, MessageType } from '@/plugins/message/constants'

export interface MessageItem {
  id: number,
  title: string,
  text: string,
  type: MessageType
  state: MessageItemState,
  duration?: number,
  animationSpeed?: number,
  length?: number,
  timer?: any
}
