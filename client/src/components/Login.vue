<template lang="pug">
  .login
    form.login__form(@submit.prevent autocomplete="off" novalidate)
      h2.u-margin-bottom-small.u-center-text {{ $t('auth.login') }}
      .form__group
        input.form__input(
          type="email"
          id="email"
          :pattern="EMAIL_REGEXP.source"
          maxlength="30"
          v-model="email"
          placeholder="Email"
          required)
        label.form__label(for="email") {{ $t('auth.email') }}
      .form__group
        input.form__input(
          type="password"
          id="password"
          :pattern="PASS_REGEXP.source"
          v-model="password"
          placeholder="Password"
          required)
        label.form__label(for="password") {{ $t('auth.password') }}
      .form__group.u-center-text
        button.btn.btn--green(@click="handleSubmit") {{ $t('auth.submit') }}
      .register__link.u-center-text
        span.register__link__label {{ $t('auth.notRegistered') }}&nbsp
        router-link.register__link__href(to="/register") {{ $t('auth.register') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as AuthApi from '@/api/auth'
import { extractErrorMessage } from '@/api/axios'

@Component
export default class Login extends Vue {
  email: string = ''
  password: string = ''

  errorKeys: string[] = []

  readonly EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  readonly PASS_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

  get isFormValid(): boolean {
    return this.errorKeys.length === 0
  }

  get validationError() {
    if (!this.isFormValid) {
      return this.$t(this.errorKeys[0]) as string
    }
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
      const { email, password } = this
      const response = await AuthApi.login({ email, password })

      const { token } = response.data
      AuthApi.setToken(token)
    } catch (e) {
      const { response } = e
      this.$message.error(extractErrorMessage(response))
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
      width: 30vw

      .register__link
        font-size 1.5rem

        &__href
          color: $color-primary-dark

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
