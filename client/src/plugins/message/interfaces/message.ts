import { MessageItem } from '@/plugins/message/interfaces/message-item'

export interface Message {
  success: (text: string) => void
  error: (text: string) => void
  warn: (text: string) => void
}

export type MessageFunc = (opts: Pick<MessageItem, 'type'|'title'|'text'>) => void
