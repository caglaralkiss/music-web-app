<template lang="pug">
  .login
      form.login__form(@submit.prevent autocomplete="off" novalidate)
        h2.u-margin-bottom-small.u-center-text {{ $t('auth.login') }}
        .login__errors(v-if="errorKeys.length > 0")
          .login__errors__label {{ $t('auth.errors.label') }}
          ul.login__errors__list
            li.login__errors__error(v-for="errorKey in errorKeys") {{ $t(errorKey) }}
          .u-margin-bottom-small
        .form__group
          input.form__input(
            type="email"
            id="email"
            maxlength="30"
            v-model="email"
            placeholder="Email"
            required)
          label.form__label(for="email") {{ $t('auth.email') }}
        .form__group
          input.form__input(
            type="text"
            id="password"
            pattern="^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"
            v-model="password"
            placeholder="Password"
            required)
          label.form__label(for="password") {{ $t('auth.password') }}
        .form__group.u-center-text
          button.btn.btn--green(@click="submit") {{ $t('auth.submit') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  email: string = ''
  password: string = ''

  errorKeys: string[] = []

  readonly EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  readonly PASS_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

  get isFormValid(): boolean {
    return !this.errorKeys
  }

  async submit() {
    this.checkForm()

    if (this.isFormValid) {
    }
  }

  checkForm() {
    this.errorKeys = []

    if (!this.email) {
      this.errorKeys.push('auth.errors.emailRequired')
    }

    if (!this.password) {
      this.errorKeys.push('auth.errors.passwordRequired')
    }

    if (!this.EMAIL_REGEXP.test(this.email)) {
      this.errorKeys.push('auth.errors.invalidEmail')
    }

    if (!this.PASS_REGEXP.test(this.password)) {
      this.errorKeys.push('auth.errors.invalidPassword')
    }
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

    &__errors
      display flex
      flex-direction column
      justify-content center
      align-items center
      font-size 2rem

      &__error
        font-size 1.5rem
        color red
</style>
