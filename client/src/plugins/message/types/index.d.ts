import { Message, MessageFunc } from '@/plugins/message/interfaces/message'

declare module 'vue/types/vue' {
  interface Vue {
    $message: Message & MessageFunc
  }
}
