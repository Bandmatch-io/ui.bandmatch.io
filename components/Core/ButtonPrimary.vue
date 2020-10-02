<template>
  <div @click="onClick" class="bg-primary-300 outline-none text-white text-center py-2 px-4 m-5" :class="totalClass">
    <slot> </slot>
  </div>
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
      }
      return 'rounded'
    },
    disabledClass () {
      if (this.disabled) {
        return 'opacity-50'
      } else {
        return 'clickable hover:bg-primary-400 hover:shadow-outline'
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
