<template lang="pug">
  .song-card
    lazy-image.song-card__image(:src="song.cover")
    .song-card__overlay
      .song-card__overlay__artist(:title="song.artist") {{ song.artist }}
      font-awesome-icon.song-card__overlay__logo(:icon="faIconClasses" size="sm" @click="playSong")
      .song-card__overlay__title(:title="song.title") {{ song.title }}
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { Song } from '@/interfaces'
import LazyImage from '@/components/shared/LazyImage.vue'
import { Action } from 'vuex-class'

const namespace = 'player'

@Component({
  components: {
    LazyImage
  }
})
export default class SongCard extends Vue {
  @Prop({ default: undefined }) song!: Song
  @Action('loadSong', { namespace }) loadSong: any

  get faIconClasses() {
    return ['far', 'play-circle']
  }

  playSong() {
    this.loadSong(this.song)
  }
}

</script>

<style lang="stylus">
  .song-card
    position relative
    width 20rem
    height 20rem
    background-color $color-tertiary-light
    margin 20px

    &__image
      position: absolute;
      width 100%
      height 100%
      opacity: 1

    &__overlay
      position: absolute
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      width 100%
      height 100%
      background-color rgba($color-black, .7)
      color $color-white
      opacity 0
      letter-spacing 1.2px

      &:hover
        opacity 1
        transition all .5s

      &:hover .song-card__overlay__title
        transform translateY(0px)

      &:hover .song-card__overlay__artist
        transform translateY(0px)

      &__title
        transform translateY(+40px)
        transition all .5s
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
        width 100%
        text-align center
        font-size 1.75rem

      &__artist
        transform translateY(-40px)
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
        text-align center
        width 100%
        transition all .5s
        font-size 1.75rem

      &__logo
        font-size 4rem
        cursor pointer
        transform scale(1)
        transition all .3s

        &:hover
          transform scale(1.3)

        &:active
          transform scale(1.2)
</style>
