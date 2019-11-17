import { bus } from './bus'
import _Vue from 'vue'
import Messages from '@/plugins/message/Messages.vue'
import { MessageType } from '@/plugins/message/constants'
import { MessageItem } from '@/plugins/message/interfaces/message-item'

export function MessagesPlugin(Vue: typeof _Vue, options?: any): void {
  Vue.component('Messages', Messages)

  const message = (message: MessageItem) => {
    bus.$emit('add', message)
  }

  message.success = (text: string) => {
    bus.$emit('add', {
      title: 'Success',
      text,
      type: MessageType.Success
    })
  }

  message.warn = (text: string) => {
    bus.$emit('add', {
      title: 'Warning',
      text,
      type: MessageType.Warning
    })
  }

  message.error = (text: string) => {
    bus.$emit('add', {
      title: 'Error',
      text,
      type: MessageType.Error
    })
  }

  message.close = (id: number) => {
    bus.$emit('close', id)
  }

  Vue.prototype['$message'] = message
}
