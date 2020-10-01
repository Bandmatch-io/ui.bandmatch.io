<template>
  <div @click="action" class="clickable bg-secondary-300 hover:bg-secondary-400 focus:bg-secondary-200 outline-none hover:shadow-outline text-white text-center py-2 px-4 m-5" :class="roundedClass">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  props: {
    action: Function,
    groupPos: String
  },
  computed: {
    roundedClass () {
      if (this.groupPos === undefined) {
        return 'rounded'
      } else if (this.groupPos === 'first') {
        return 'rounded-l'
      } else if (this.groupPos === 'last') {
        return 'rounded-r'
      }
      return 'rounded'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
