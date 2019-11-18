<template lang="pug">
  .register
    form.register__form(@submit.prevent autocomplete="off" novalidate)
      h2.u-margin-bottom-small.u-center-text {{ $t('auth.register') }}
      .form__group
        input.form__input(
          type="text"
          id="firstName"
          maxlength="30"
          v-model="firstName"
          placeholder="First name"
          required)
        label.form__label(for="firstName") {{ $t('auth.firstName') }}
      .form__group
        input.form__input(
          type="text"
          id="lastName"
          maxlength="30"
          v-model="lastName"
          placeholder="Last name"
          required)
        label.form__label(for="lastName") {{ $t('auth.lastName') }}
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
          type="text"
          id="password"
          :pattern="PASS_REGEXP.source"
          v-model="password"
          placeholder="Password"
          required)
        label.form__label(for="password") {{ $t('auth.password') }}
      .form__group.u-center-text
        button.btn.btn--green(@click="handleSubmit") {{ $t('auth.submit') }}
      .login__link.u-center-text
        span.login__link__label {{ $t('auth.notLogin') }}&nbsp
        router-link.login__link__href(to="login") {{ $t('auth.login') }}
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { extractErrorMessage } from '@/api/axios'
import * as AuthApi from '@/api/auth'

@Component
export default class Register extends Vue {
  firstName = ''
  lastName = ''
  email = ''
  password = ''

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
      const { firstName, lastName, email, password } = this
      await AuthApi.register({ firstName, lastName, email, password })

      await this.$router.push({
        path: '/home'
      })
    } catch (e) {
      const { response } = e
      this.$message.error(extractErrorMessage(response))
    }
  }

  checkForm() {
    this.errorKeys = []

    if (!this.firstName) {
      this.errorKeys.push('auth.errors.firstNameRequired')
    }

    if (!this.lastName) {
      this.errorKeys.push('auth.errors.lastNameRequired')
    }

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
  .register
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

      .login__link
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
