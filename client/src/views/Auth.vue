<template lang="pug">
  .auth
    .auth__header
      .auth__header__logo
        img(src="@/assets/logo.png")
      .auth__header__title
        h1 {{ title }}
    .auth__body
      router-view
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Auth extends Vue {
  title = 'Musicify'
}

</script>

<style lang="stylus" scoped>
  $title-font-size = 4rem

  .auth
    height 100vh

    &__header
      height 15vh
      padding 1rem 0
      display flex
      flex-direction row
      justify-content center
      border-bottom 1px solid rgba($color-black, .1)

      animation-name fadeIn
      animation-duration 1s
      animation-timing-function ease-out

      &__logo
        display flex
        flex-direction column
        justify-content center

      img
          height $title-font-size + 3rem

      &__title
        display flex
        flex-direction column
        justify-content center

        h1
          font-size $title-font-size
          font-weight 900

    &__body
      height 85vh
      width 100vw
</style>
