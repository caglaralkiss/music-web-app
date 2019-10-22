<template lang="pug">
  .auth
    .auth__header
      .auth__header__logo
        img(alt="musicify-logo")
      .auth__header__title
        h1 {{ title }}
    .auth__body
      router-view
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class Auth extends Vue {
  title = 'Musicify'
}

</script>

<style lang="stylus" scoped>

  .auth
    height 100vh
    position: relative;

    &__header
      padding 0 1rem

      &__logo
        display inline-block

      &__title
        display inline-block

        h1
          font-size 2.5rem
</style>
