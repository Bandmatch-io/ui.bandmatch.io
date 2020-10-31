<template>
  <button class="block bg-complementary-300 outline-none text-secondary-500 text-center py-2 px-4 m-5" :class="totalClass" @click="onClick">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    action: Function,
    groupPos: String,
    disabled: Boolean
  },
  computed: {
    roundedClass () {
      // let options = "<V|^>"
      if (this.groupPos === undefined) {
        return 'rounded'
      } else if (this.groupPos === 'first') {
        return 'rounded-l'
      } else if (this.groupPos === 'last') {
        return 'rounded-r'
      } else if (this.groupPos === 'mid') {
        return 'rounded-0'
      }
      return 'rounded'
    },
    disabledClass () {
      if (this.disabled) {
        return 'opacity-50'
      } else {
        return 'clickable hover:bg-complementary-400 hover:shadow-outline'
      }
    },
    totalClass () {
      return this.roundedClass + ' ' + this.disabledClass
    }
  },
  methods: {
    onClick () {
      if (!this.disabled) {
        this.action()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
