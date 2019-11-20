<template lang="pug">
  .shell
    .shell__header
      .shell__header__banner
        .shell__header__banner__logo: font-awesome-icon.fa-logo(icon="music" size="lg")
        .shell__header__banner__title: h1 Musicify
      .shell__header__nav
          router-link(to="/auth/register") {{ $t('auth.register') }}
          router-link(to="/auth/login") {{ $t('auth.login') }}
    .shell__body
      .shell__body__nav
        router-link.shell__body__nav__item(:class="currentRouteName === 'home' ? 'active' : ''" to="home")
          font-awesome-icon.fa-logo(icon="home" size="lg")
          h2 {{ $t('shell.home') }}
        router-link.shell__body__nav__item(:class="currentRouteName === 'search' ? 'active' : ''" to="search")
          font-awesome-icon.fa-logo(icon="search" size="lg")
          h2 {{ $t('shell.search') }}
      .shell__body__main
        router-view
    .shell__footer Footer
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Shell extends Vue {
  get currentRouteName() {
    return this.$route.name
  }
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
        margin-left 1rem

        &__logo
          display flex
          flex-direction column
          justify-content center

          .fa-logo
            color: $color-white
            margin 0 7px
            font-size 3rem

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
        padding-top 2rem

        &__item
          display flex
          flex-direction row
          justify-content center
          align-items center
          margin 0 10rem 2rem 0
          color $color-grey-dark

          text-decoration none
          border-left 3px solid
          border-left-color $color-tertiary-dark

          .fa-logo
            font-size 2.3rem
            margin-right 2rem

        .active
          color: $color-white
          border-left-color $color-primary-dark

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
