<template lang="pug">
  .login
    .login__form
      form.form(@submit.prevent)
        .u-margin-bottom-medium
          h2.u-center-text Login
        .form__group
          input.form__input(
            type="text"
            id="email"
            v-model="email"
            placeholder="Email"
            required)
          label.form__label(for="email") Email
        .form__group
          input.form__input(
            type="text"
            id="password"
            v-model="password"
            placeholder="Password"
            required)
          label.form__label(for="password") Password
        .form__group
          button.btn.btn--green(@click="submit" :disabled="isFormValid") Submit
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  email: string = '';
  password: string = '';
  isFormValid: boolean = false;

  async submit() {
    console.log(this.email + ' ' + this.password)
  }
}

</script>

<style lang="stylus">
  .login
    display flex
    align-items center
    justify-content center
    height inherit
    width inherit

    h2
      font-size: 3.5rem
      font-weight 700
      background-image linear-gradient(to right, $color-primary-light, $color-primary-dark)
      -webkit-background-clip text
      color transparent
      animation-name slideFromUp
      animation-duration 1s
      animation-timing-function ease-out

    &__form
      width: 30vw;
</style>
