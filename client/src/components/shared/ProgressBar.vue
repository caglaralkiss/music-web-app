<template lang="pug">
  .progress__bar(@click="handleBarClick")
    .filled(ref="filled" :style="{ width: `${ realWidth }%` }")
    .handle
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class ProgressBar extends Vue {
  @Prop({ default: 100 }) width!: number

  realWidth!: number

  @Watch('width', { immediate: true })
  onWidthChange(newWidth: number) {
    this.realWidth = newWidth
    this.$forceUpdate()
  }

  @Emit('seek')
  handleBarClick($event: MouseEvent) {
    this.realWidth = this.calculateClickedPointPercentage($event)
    this.$forceUpdate()
    return this.realWidth
  }

  calculateClickedPointPercentage($event: MouseEvent) {
    const { left } = (this.$el as any).getBoundingClientRect()
    const width = $event.clientX - left

    const barWidth = (this.$el as any).offsetWidth
    return ((100 * width) / barWidth)
  }
}

</script>

<style lang="stylus" scoped>
  .progress__bar
    display flex
    align-self center
    border-radius 50px
    background-color $color-grey-dark-3
    cursor pointer

    .filled
      height 4px
      align-self center
      background-color $color-grey-dark
      border-radius 20px

    .handle
      height 6px
      width 0
      background-color $color-grey-dark
      border-radius 50%
      visibility hidden
      transform scale(2)

    &:hover .handle
      visibility visible
      width 6px
</style>
