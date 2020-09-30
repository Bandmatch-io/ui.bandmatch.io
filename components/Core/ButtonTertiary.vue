<template>
  <div @click="action" class="clickable bg-tertiary-300 hover:bg-tertiary-400 focus:bg-tertiary-200 outline-none hover:shadow-outline text-white text-center font-bold py-2 px-4 rounded m-5">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  props: {
    action: Function
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
