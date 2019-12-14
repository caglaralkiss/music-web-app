<template lang="pug">
  .modal(v-if="isVisible")
    component(:is="name" v-bind="props" @close="closeModal")
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { ModalName } from '@/store/modal/types'

const namespace: string = 'modal'

@Component({
  components: {
  }
})
export default class Modal extends Vue {
  @Action('closeModal', { namespace }) closeModal!: () => void
  @Getter('isVisible', { namespace }) isVisible!: boolean
  @Getter('modalName', { namespace }) name!: ModalName
  @Getter('modalProps', { namespace }) props!: Record<string, any> | {}
}

</script>

<style lang="stylus" scoped>
  .modal
    position fixed
    height 100vh
    width 100vw
    z-index 10
    background-color rgba($color-black, .6)
</style>
