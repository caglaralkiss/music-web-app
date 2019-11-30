<template lang="pug">
  .player
    .player__current Mahsun Kırmızıgül
    .player__wrapper
      audio(ref="player")
      .player__audio
          .player__audio__buttons.u-margin-bottom-small
            font-awesome-icon.fa-icon.small(icon="random" @click="shuffle")
            font-awesome-icon.fa-icon.small(icon="step-backward" @click="playPreviousSong")
            font-awesome-icon.fa-icon.medium(:icon="['far', 'play-circle']" @click="playPause")
            font-awesome-icon.fa-icon.small(icon="step-forward" @click="playNextSong")
            font-awesome-icon.fa-icon.small(icon="redo-alt" @click="repeat")
          .player__audio__controls
            .player__audio__elapsed 0:00
            .player__audio__bar(ref="bar" @click="onBarClicked")
              .full(ref="elapsed")
              .handle(ref="pointer")
            .player__audio__total 0:00
    .player__volume 80 - 100
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AudioPlayer extends Vue {
  get bar() {
    return this.$refs.bar as HTMLElement
  }

  get elapsed() {
    return this.$refs.elapsed as HTMLElement
  }

  get player() {
    return this.$refs.player as HTMLAudioElement
  }

  get pointer() {
    return this.$refs.pointer as HTMLElement
  }

  mounted() {

  }

  onBarClicked($event: MouseEvent) {
    const { left } = this.bar.getBoundingClientRect()
    const width = $event.clientX - left

    const barWidth = this.bar.offsetWidth
    const percentage = ((100 * width) / barWidth)
    this.elapsed.style.width = `${percentage}%`
    this.seekTime(percentage)
  }

  seekTime(timePercentage: number) {
    const { duration } = this.player
    this.player.currentTime = (duration * timePercentage) / 100
  }

  shuffle() {
  }

  playPreviousSong() {
  }

  playNextSong() {
  }

  playPause() {
  }

  repeat() {
  }
}

</script>

<style lang="stylus">
  .player
    width 100%
    height 100%
    display flex
    flex-direction row
    justify-content space-between
    align-items center

    &__current
      color $color-white
      background-color lawngreen

    &__audio
      display flex
      flex-direction column
      justify-content center
      align-items center

      &__buttons
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        width 22rem

        .fa-icon
          color $color-grey-dark-2
          cursor pointer
          &:hover
            color $color-grey-light-1

        .small
          font-size 1.5rem
        .medium
          font-size 3rem
          &:hover
            transform scale(1.1, 1.1)

      &__controls
        display flex
        flex-direction row
        justify-content space-between
        width 60rem

      &__bar
        display flex
        align-self center
        width 90%
        height 5px
        margin 0 10px
        border-radius 50px
        background-color $color-grey-dark-3
        cursor pointer

        .full
          height 5px
          background-color $color-grey-dark
          border-radius 20px

        .handle
          height 8px
          width 8px
          background-color $color-grey-dark
          border-radius 50%
          margin-left -5px
          visibility hidden
          transform scale(2)

        &:hover .handle
          visibility visible

      &__elapsed
        color $color-grey-dark
        font-size 1.2rem
      &__total
        color $color-grey-dark
        font-size 1.2rem

    &__volume
      color $color-white
      background-color lightblue
</style>
