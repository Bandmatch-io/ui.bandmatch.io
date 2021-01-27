<template>
  <p class="text-complementary-400 mb-1 mt-0">
    <alert-triangle-icon class="inline-block" />
    <slot />
  </p>
</template>

<script>
import { AlertTriangleIcon } from 'vue-feather-icons'
export default {
  components: {
    AlertTriangleIcon
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss'
</style>
