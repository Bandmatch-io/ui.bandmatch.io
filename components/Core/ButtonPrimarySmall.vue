<template>
  <button class="inline-block bg-primary-300 outline-none text-white text-center p-1" :class="totalClass" @click="onClick">
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
        return 'clickable hover:bg-primary-400 ring-primary-200 ring-0 hover:ring ring-opacity-50'
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
