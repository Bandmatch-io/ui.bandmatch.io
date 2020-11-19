<template>
  <div class="capitalize shadow-sm select-none inline-block shadow font-bold rounded m-2 px-2 py-1 bg-secondary-400 text-white" :class="{ 'hover:bg-secondary-500 clickable hover:line-through ring-secondary-200 ring-0 hover:ring ring-opacity-50': edit }" @click="$emit('click')">
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
