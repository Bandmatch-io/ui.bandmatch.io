<template>
  <div class="capitalize select-none inline-block shadow hover:line-through hover:shadow-outline font-bold rounded m-2 px-2 py-1 bg-secondary-400 hover:bg-secondary-500 clickable text-white" @click="$emit('click')">
    <p>{{ val }}</p>
  </div>
</template>

<script>
export default {
  props: {
    val: String
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
