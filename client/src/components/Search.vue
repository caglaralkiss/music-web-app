<template lang="pug">
  .search
    .search__input: input.form__input(v-model="searchTerm" type="text" maxlength="30" :placeholder="$t('search.placeholder')")
    .search__result
      song-card(v-for="song in songs" :song="song")
</template>

<script lang="ts">

import { Vue, Component, Watch } from 'vue-property-decorator'
import SongCard from '@/components/shared/SongCard.vue'
import { Page, Song } from '@/interfaces'
import * as SongApi from '@/api/song'
import { extractErrorMessage } from '@/api/axios'

@Component({
  components: {
    SongCard
  }
})
export default class Search extends Vue {
  searchTerm: string = ''
  debounced: Function = this.debounce(this.loadSongs, 1000)

  songs: Array<Song> = []
  page: Page = {
    pageNum: 1,
    offset: 10
  }
  allDataCompleted = false

  @Watch('searchTerm')
  onSearchTermChange() {
    this.songs = []
    this.debounced()
  }

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
      const response = await SongApi.getSongs({ ...this.page, search: this.searchTerm })
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

  debounce(fun: Function, timeout: number) {
    let timer: any

    return (...args: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => fun(...args), timeout)
    }
  }
}

</script>

<style lang="stylus" scoped>
  .search
    width: 100%
    height 100%
    overflow-y scroll

    &__result
      display flex
      flex-direction row
      flex-wrap wrap
</style>
