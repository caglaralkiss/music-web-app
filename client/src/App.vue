<template lang="pug">
  div(id="app")
    messages(:max-message="3")
    modal
    router-view
</template>

<script lang="ts">
import Vue from 'vue'
import Modal from '@/components/shared/Modal.vue'
import { Component } from 'vue-property-decorator'

@Component({
  components: { Modal }
})
export default class App extends Vue {
}
</script>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap')
  @import "styles/styl/main.styl"
</style>
