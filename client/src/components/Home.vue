<template lang="pug">
  .home
    .home__header
      .home__header__main {{ $t('songs.title') }}
      .home__header__sub {{ $t('songs.subTitle') }}
    .home__cards
      song-card(v-for="song in songs" :song="song" :key="song.id")
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import SongCard from '@/components/shared/SongCard.vue'
import { Page, Song } from '@/interfaces'
import * as SongApi from '@/api/song'
import { extractErrorMessage } from '@/api/axios'

@Component({
  components: {
    SongCard
  }
})
export default class Home extends Vue {
  songs: Array<Song> = []
  page: Page = {
    pageNum: 1,
    offset: 10
  }
  allDataCompleted = false

  mounted() {
    this.$el.addEventListener('scroll', async () => {
      if (this.$el.scrollTop + this.$el.clientHeight >= this.$el.scrollHeight) {
        if (!this.allDataCompleted) {
          this.loadSongs()
        }
      }
    })
    this.loadSongs()
  }

  async loadSongs() {
    try {
      const response = await SongApi.getSongs({ ...this.page })
      const { result, next } = response.data

      this.songs.push(...result)

      if (!next) {
        this.allDataCompleted = true
        return
      }

      this.nextPage()
    } catch (e) {
      const { response } = e
      this.$message.error(extractErrorMessage(response))
    }
  }

  nextPage(): void {
    this.page.pageNum++
  }
}

</script>

<style lang="stylus" scoped>
  .home
    padding 10px
    height 90%
    width 100%
    overflow-y scroll

    &__header
      margin 2rem

      &__main
        font-size 2.5rem
        color $color-white

      &__sub
        font-size 1.5rem
        color $color-grey-light-2

    &__cards
      display flex
      flex-direction row
      flex-wrap wrap
</style>
