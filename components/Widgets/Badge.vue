<template>
  <div class="capitalize select-none inline-block shadow font-bold rounded m-2 px-2 py-1 bg-secondary-400 text-white" :class="{ 'hover:bg-secondary-500 clickable hover:line-through hover:shadow-outline': edit }" @click="$emit('click')">
    <p>{{ val }}</p>
  </div>
</template>

<script>
export default {
  props: {
    val: String,
    edit: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
