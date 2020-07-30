<template lang="pug">
  .song(v-if="song")
    .song__image
      img(:src="song.cover")
      .song__meta__buttons
        button.btn.btn--green(@click="handlePlay") {{ $t('song.play') }}
        button.btn.btn--red(v-if="email === song.owner" @click="handleDelete") {{ $t('song.delete') }}
    .song__meta
      .song__meta__items
        .song__meta__item {{ $t('song.title') + ': ' +  song.title }}
        .song__meta__item {{ $t('song.album') + ': ' + song.album }}
        .song__meta__item {{ $t('song.artist') + ': ' + song.artist }}
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { Song } from '@/interfaces'
import { getSong, deleteSong, extractErrorMessage } from '@/api'
import { Action, Getter } from 'vuex-class'

const playerNamespace: string = 'player'
const authNamespace: string = 'auth'

@Component
export default class SongDetail extends Vue {
  public song: Song | null = null

  @Action('loadSong', { namespace: playerNamespace }) loadSong!: (song: Song) => {}
  @Getter('email', { namespace: authNamespace }) email!: string

  async created() {
    try {
      const { id } = this.$route.params
      const response = await getSong({ id })

      this.song = response.data
    } catch (e) {
      this.$message.error(extractErrorMessage(e))
      await this.$router.push('/home')
    }
  }

  handlePlay() {
    this.loadSong(this.song!)
  }

  async handleDelete() {
    try {
      await deleteSong({ id: this.song!.id })
      await this.$router.push({
        path: '/home'
      })
    } catch (e) {
      this.$message.error(extractErrorMessage(e))
    }
  }
}

</script>

<style scoped lang="stylus">
  .song
    color $color-white
    padding 1rem
    display flex
    flex-direction row
    justify-content center
    align-items center
    width 100%
    height 100%

    &__image
      display flex
      flex-direction column
      justify-content center
      align-items center
      height 90%
      width 50%
      padding 1rem 2rem

      img
        padding 3rem
        height 100%
        width 100%

    &__meta
      height 80%
      width 70%
      display flex
      flex-direction column
      align-items center
      justify-content space-around

      &__item
        font-size 2rem

      &__buttons
        width 100%
        display flex
        flex-direction row
        justify-content space-around
        align-items center
</style>
