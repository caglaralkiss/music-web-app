<template lang="pug">
  .player
    .player__current {{ songTitle }}
    .player__wrapper
      audio(ref="player" :loop="isLoop" @timeupdate="onTimeChange" @ended="onSongEnded")
      .player__audio
        .player__audio__buttons.u-margin-bottom-small
          font-awesome-icon.fa-icon.small(icon="random" @click="shuffle")
          font-awesome-icon.fa-icon.small(icon="step-backward" @click="playPreviousSong")
          font-awesome-icon.fa-icon.medium(
            :icon="playerState === 'playing' ? ['far', 'pause-circle'] : ['far', 'play-circle']"
            @click="operation")
          font-awesome-icon.fa-icon.small(icon="step-forward" @click="playNextSong")
          font-awesome-icon.fa-icon.small(icon="redo-alt" :class="isLoop ? 'looped' : ''" @click="repeat")
        .player__audio__controls
          .player__audio__elapsed {{ elapsedTime }}
          .player__audio__bar: progress-bar(:width="currentTimePercentage" @seek="seekTime")
          .player__audio__total {{ duration }}
    .player__volume
      font-awesome-icon.fa-icon.small(:icon="volume === 0 ? 'volume-mute' : 'volume-up'" @click="mute")
      progress-bar.player__volume__bar(:width="volume" @seek="volumeSeekHandler")
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Song } from '@/interfaces'
import { AudioPlayerState, UserMode } from '@/store/player/types'
import ProgressBar from '@/components/shared/ProgressBar.vue'

const namespace = 'player'
@Component({
  components: { ProgressBar }
})
export default class AudioPlayer extends Vue {
  @Action('clearSong', { namespace }) clearSong: any
  @Action('setDuration', { namespace }) setDuration: any
  @Action('updateElapsedTime', { namespace }) updateElapsedTime: any
  @Action('setLoop', { namespace }) setLoop: any
  @Action('changePlayerState', { namespace }) changePlayerState: any
  @Action('setVolume', { namespace }) changeVolume: any

  @Getter('song', { namespace }) song!: Song
  @Getter('volume', { namespace }) volume!: number
  @Getter('elapsedTime', { namespace }) elapsedTime!: string
  @Getter('duration', { namespace }) duration!: string
  @Getter('isLoop', { namespace }) isLoop!: boolean
  @Getter('playerState', { namespace }) playerState!: AudioPlayerState
  @Getter('userMode', { namespace }) userMode!: UserMode

  currentTimePercentage: number = 0

  get player() {
    return this.$refs.player as HTMLAudioElement
  }

  get songTitle() {
    return this.song ? this.song.title : ''
  }

  @Watch('song', { deep: true })
  onSongChange(newSong: Song) {
    this.player.src = newSong.audio
    this.playSong()
  }

  onTimeChange() {
    const { duration, currentTime } = this.player
    this.updateElapsedTime(currentTime)
    this.setDuration(duration)
    this.currentTimePercentage = (currentTime * 100) / duration
  }

  onSongEnded() {
    this.updateElapsedTime(0)
    this.setDuration(0)
    this.currentTimePercentage = 0
    this.changePlayerState('idle')
    this.clearSong()
  }

  volumeSeekHandler(percentage: number) {
    this.changeVolume(percentage)
    this.player.volume = percentage / 100
  }

  mute() {
    this.volumeSeekHandler(0)
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

  operation() {
    if (this.song) {
      if (this.playerState === 'paused') {
        this.playSong()
      } else {
        this.pauseSong()
      }
    }
  }

  playSong() {
    this.changePlayerState('playing')
    this.player.play()
  }

  pauseSong() {
    this.changePlayerState('paused')
    this.player.pause()
  }

  repeat() {
    this.setLoop(!this.isLoop)
  }
}

</script>

<style lang="stylus" scoped>
  .player
    width 100%
    height 100%
    display flex
    flex-direction row
    justify-content space-around
    align-items center

    &__current
      color $color-white
      background-color lawngreen
      width 10%

    &__wrapper
      width 80%

    &__audio
      display flex
      flex-direction column
      justify-content center
      align-items center

      &__buttons
        display flex
        flex-direction row
        justify-content space-around
        align-items center
        width 25%

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
        .looped
          color $color-grey-light-1

      &__controls
        display flex
        flex-direction row
        justify-content space-between
        width 60%

      &__bar
        width 90%
        padding 0 10px
        align-self center
        cursor pointer

      &__elapsed
        color $color-grey-dark
        font-size 1.2rem
      &__total
        color $color-grey-dark
        font-size 1.2rem

    &__volume
      display flex
      flex-direction row
      justify-content space-between
      width 10%
      padding-right 10px

      .fa-icon
        color $color-grey-dark-2
        cursor pointer
        &:hover
          color $color-grey-light-1

      .small
        font-size 1.5rem

      &__bar
        margin-left 10px
        width 90%
</style>
