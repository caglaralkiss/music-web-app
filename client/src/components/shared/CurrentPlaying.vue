<template lang="pug">
  .current(v-if="song")
    img.current__image(:src="song.cover" alt="song.title")
    .current__song
      .current__song__title {{ song.title }}
      .current__song__artists {{ song.artist }} {{ isLastArtist ? '' : ',' }}
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Song } from '@/interfaces'

const namespace = 'player'

@Component
export default class CurrentPlaying extends Vue {
  @Getter('song', { namespace }) song!: Song

  isLastArtist(index: number) {
    return index >= Array.from(this.song.artist).length - 1
  }
}

</script>

<style lang="stylus" scoped>
  .current
    display flex
    flex-direction row
    justify-content space-around
    width 100%
    height 100%

    &__image
      height 100%
      width: 20%
      margin-right 20px

    &__song
      display flex
      flex-direction column
      justify-content center
      width 80%
      font-size 1.5rem

      &__title
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
        color $color-grey-light-1
      &__artists
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
        color $color-grey-dark
</style>
