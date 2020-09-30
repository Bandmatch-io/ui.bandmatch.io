<template>
  <div @click="action" class="clickable bg-primary-300 hover:bg-primary-400 focus:bg-primary-200 outline-none hover:shadow-outline text-white text-center font-bold py-2 px-4 rounded m-5">
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
