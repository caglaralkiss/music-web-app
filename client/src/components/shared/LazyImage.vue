<template lang="pug">
  img(:src="image")
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  inheritAttrs: true
})
export default class LazyImage extends Vue {
  @Prop({ default: '' }) src!: string

  observer: IntersectionObserver | null = null
  intersected= false

  get image() {
    return this.intersected ? this.src : ''
  }

  mounted() {
    this.observer = new IntersectionObserver(entries => {
      const image = entries[0]
      if (image.isIntersecting) {
        this.intersected = true
      }
    })

    this.observer.observe(this.$el)
  }

  destroyed() {
    this.observer!.disconnect()
  }
}

</script>
