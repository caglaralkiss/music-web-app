<template lang="pug">
  .message__container
    transition-group(name="fade")
      .message__wrapper(v-for="message in activeMessages" :key="message.id" :data-id="message.id")
        div(:class="[`message__box`, `message__box__${ message.type }`]" @click="destroyMessage(message)")
          .message__title(v-if="message.title") {{ message.title }}
          .message__body {{ message.text }}
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { bus } from './bus'
import * as Defaults from './constants/message-defaults'
import { MessageItem } from './interfaces/message-item'
import { MessageItemState } from '@/plugins/message/constants'

@Component({
  name: 'Messages'
})
export default class Messages extends Vue {
  @Prop({ default: Defaults.ANIMATION_SPEED }) animationSpeed!: number
  @Prop({ default: Defaults.DURATION }) duration!: number
  @Prop({ default: Defaults.MAX_MESSAGE }) maxMessage!: number

  id: number = 0
  messageList: Array<MessageItem> = []

  get activeMessages(): Array<MessageItem> {
    return this.messageList
      .filter(message => message.state === MessageItemState.Activated)
  }

  get isActiveMessagesExceed(): boolean {
    return this.activeMessages.length > this.maxMessage
  }

  mounted() {
    bus.$on('add', this.addMessage)
    bus.$on('close', this.closeMessage)
  }

  addMessage(event: Omit<MessageItem, 'id'>) {
    const message: MessageItem = this.buildMessageFromEvent(event)
    const messageLength = message.duration! + 2 * message.animationSpeed!

    if (message.duration! >= 0) {
      message.timer = setTimeout(() => {
        this.destroyMessage(message)
      }, messageLength)
    }

    this.messageList.push(message)

    if (this.isActiveMessagesExceed) {
      this.destroyMessage(this.activeMessages[0])
    }
  }

  closeMessage(id: number): void {
    this.destroyMessageById(id)
  }

  destroyMessage(message: MessageItem) {
    clearTimeout(message.timer)
    message.state = MessageItemState.Destroyed
    this.clearDestroyedMessages()
  }

  destroyMessageById(id: number) {
    const message = this.messageList.find(message => message.id === id)

    if (message) {
      this.destroyMessage(message)
    }
  }

  clearDestroyedMessages() {
    this.messageList = this.messageList.filter(message => message.state !== MessageItemState.Destroyed)
  }

  private buildMessageFromEvent(event: Omit<MessageItem, 'id'>): MessageItem {
    const { title, animationSpeed, text, type, duration } = event

    return {
      id: this.id++,
      title,
      text,
      type,
      state: MessageItemState.Activated,
      animationSpeed: animationSpeed || this.animationSpeed,
      duration: duration || this.duration
    }
  }
}

</script>

<style lang="stylus">
  .message

    &__container
      display block
      position fixed
      z-index 1000
      width 40vw
      bottom 0
      right 0

    &__wrapper
      display block
      overflow hidden
      width 100%
      margin 0
      padding 0

    &__box
      display block
      box-sizing border-box
      text-align left
      font-size 1.5rem
      color $color-white
      padding 10px
      margin 0 5px 5px
      border-left 5px solid

      &__warning
        background #ffb648
        border-left-color #f48a06

      &__error
        background #E54D42
        border-left-color #B82E24

      &__success
        background #68CD86
        border-left-color #42A85F

    &__title
      font-size 2rem
      font-weight 600

  .fade-enter-active, .fade-leave-active, .fade-move
    transition all .5s

  .fade-enter, fade-leave-to
    opacity 0

</style>
