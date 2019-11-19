<template lang="pug">
  .shell
    .shell__header
      .shell__header__banner
        .shell__header__banner__logo: img(src="@/assets/logo.png")
        .shell__header__banner__title: h1 Musicify
      .shell__header__nav
          router-link(to="/auth/register") {{ $t('auth.register') }}
          router-link(to="/auth/login") {{ $t('auth.login') }}
    .shell__body
      .shell__body__nav
        router-link(to="/").shell__nav__link Link #1
        router-link(to="/").shell__nav__link Link #2
      .shell__body__main
        router-view
    .shell__footer Footer
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class Shell extends Vue {
}

</script>

<style lang="stylus" scoped>
  .shell
    height 100vh

    &__header
      display flex
      flex-direction row
      justify-content space-between
      background-color $color-tertiary-dark
      height 10vh

      &__banner
        display flex
        flex-direction row
        justify-content center

        &__logo
          display flex
          flex-direction column
          justify-content center

          img
            margin-left 15px
            height 35px

        &__title
          display flex
          flex-direction column
          justify-content center
          color $color-white
          font-size 1.25rem

      &__nav
        display flex
        flex-direction row
        align-self center
        margin-right 20px

        a
          margin-right 30px
          text-decoration none
          color $color-white
          font-size 2rem

    &__body
      display flex
      flex-direction row
      height 75vh
      width 100%

      &__nav
        display flex
        flex-direction column
        background-color $color-tertiary-dark
        width 15%
        height 100%

      &__main
        display flex
        flex-direction row
        width 85%
        height 100%
        background-color rgba($color-tertiary-dark, .98)
    &__footer
      display flex
      flex-direction row
      height 15 vh
      background-color rgba($color-tertiary-dark, .94)

</style>
