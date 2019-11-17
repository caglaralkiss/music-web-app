<template lang="pug">
  div(id="app")
    messages(:max-message="3")
    router-view
</template>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap')
  @import "styles/styl/main.styl"
</style>
