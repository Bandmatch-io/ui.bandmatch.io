<template>
  <div class="progress-bar w-full block bg-gray-500">
    <div class="progress-slider bg-secondary-300" :style="`width: ${percent}%;`"/>
  </div>
</template>

<script>
export default {
  props: {
    percent: Number
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';

.progress-bar {
  height: 8px;

  .progress-slider {
    height: 8px;
  }
}
</style>
