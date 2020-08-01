<template lang="pug">
  .upload
    form.upload__form(@submit.prevent autocomplete="off" novalidate)
      h2.u-margin-bottom-small.u-center-text {{ $t('song.pageTitle') }}
      .form__group
        input.form__input(
          type="text"
          id="title"
          maxlength="30"
          v-model="title"
          placeholder="Song Name"
          required)
        label.form__label(for="title") {{ $t('song.title') }}
      .form__group
        input.form__input(
          type="text"
          id="album"
          v-model="album"
          maxlength="30"
          placeholder="Album name"
          required)
        label.form__label(for="album") {{ $t('song.album') }}
      .form__group
        input.form__input(
          type="text"
          id="artist"
          v-model="artist"
          maxlength="60"
          :pattern="ARTIST_PATTERN"
          placeholder="Artist(s)"
          required)
        label.form__label(for="artist") {{ $t('song.artist') }}
      .form__group
        input.form__input(
          type="file"
          id="cover"
          v-on:change="coverChange"
          placeholder="Cover"
          accept=".jpg,.jpeg")
        label.form__label(for="cover") {{ $t('song.cover') }}
      .form__group
        input.form__input(
          type="file"
          id="audio"
          v-on:change="audioChange"
          accept=".mp3"
          placeholder="Audio")
        label.form__label(for="audio") {{ $t('song.audio') }}
      .form__group.u-center-text
        button.btn.btn--green(@click="handleSubmit") {{ $t('auth.submit') }}
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { extractErrorMessage, postSong } from '@/api'
import { Getter } from 'vuex-class'

const namespace: string = 'auth'

@Component
export default class UploadSong extends Vue {
  @Getter('email', { namespace }) email!: string

  title = ''
  album = ''
  artist: string = ''
  cover: File | null = null
  audio: File | null = null

  errorKeys: string[] = []

  readonly ARTIST_PATTERN = /^([a-zA-Z0-9]*,)*[a-zA-Z0-9]+$/
  readonly MAX_FILE_SIZE = 20 * Math.pow(10, 6) // 20 MB

  get isFormValid(): boolean {
    return this.errorKeys.length === 0
  }

  get validationError() {
    if (!this.isFormValid) {
      return this.$t(this.errorKeys[0]) as string
    }
  }

  audioChange(e: any) {
    const files = e.target.files || e.dataTransfer.files

    if (!files.length) {
      return
    }

    this.audio = files[0]
  }

  coverChange(e: any) {
    const files = e.target.files || e.dataTransfer.files

    if (!files.length) {
      return
    }

    this.cover = files[0]
  }

  async handleSubmit() {
    this.checkForm()

    if (this.isFormValid) {
      this.submit()
    } else {
      this.$message.error(this.validationError!)
    }
  }

  async submit() {
    try {
      const { title, album, cover, audio, artist } = this

      await postSong({
        title,
        album,
        cover: cover as File,
        audio: audio as File,
        artist: this.extractArtists(artist),
        owner: this.email
      })
      this.$message.success(title + ' uploaded successfully!')
      await this.$router.push('home')
    } catch (e) {
      this.$message.error(extractErrorMessage(e))
    }
  }

  checkForm() {
    this.errorKeys = []

    if (!this.title) {
      this.errorKeys.push('song.errors.titleRequired')
    }

    if (!this.album) {
      this.errorKeys.push('song.errors.albumRequired')
    }

    if (!this.artist) {
      this.errorKeys.push('song.errors.artistsRequired')
    }

    if (!this.cover) {
      this.errorKeys.push('song.errors.coverRequired')
    } else {
      if (!this.isFileSizeValid(this.cover, this.MAX_FILE_SIZE)) {
        this.errorKeys.push('song.errors.maxFileSizeExceedCover')
      }

      if (!this.isExtensionValid(this.cover, ['jpg', 'jpeg'])) {
        this.errorKeys.push('song.errors.notExpectedFileExtensionCover')
      }
    }

    if (!this.audio) {
      this.errorKeys.push('song.errors.audioRequired')
    } else {
      if (!this.isFileSizeValid(this.audio, this.MAX_FILE_SIZE)) {
        this.errorKeys.push('song.errors.maxFileSizeExceedAudio')
      }

      if (!this.isExtensionValid(this.audio, ['mp3'])) {
        this.errorKeys.push('song.errors.notExpectedFileExtensionAudio')
      }
    }
  }

  private isFileSizeValid(file: File, maxSize: number): boolean {
    return maxSize > file.size
  }

  private isExtensionValid(file: File, allowedExtensions: string[]) {
    return allowedExtensions.includes(file.name.split('.')[1])
  }

  private extractArtists(artistStr: string): string[] {
    return artistStr.split(',')
  }
}

</script>

<style scoped lang="stylus">
  .upload
    display: flex
    flex-direction column
    align-items center
    justify-content center
    width 100%
    height 100%
    color $color-grey-light-1
    overflow-y scroll

    .upload__form
      height 100%

      input
        color $color-black

  h2
    font-size 5rem
</style>
