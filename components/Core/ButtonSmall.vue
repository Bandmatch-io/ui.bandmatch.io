<template>
  <button class="inline-block outline-none text-center p-1" :class="totalClass" @click="onClick">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    action: { type: Function, default () { return () => {} } },
    groupPos: { type: String, default () { return 'none' } },
    disabled: Boolean,
    colour: { type: String, default () { return 'primary' } }
  },
  computed: {
    roundedClass () {
      if (this.groupPos === 'none') {
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
        return `clickable hover:bg-${this.colour}-400 ring-${this.colour}-200 ring-0 hover:ring ring-opacity-50`
      }
    },
    colourClass () {
      let tc = 'text-white'
      if (this.colour === 'complementary') {
        tc = 'text-secondary-500'
      }

      return `bg-${this.colour}-300 ${tc}`
    },
    totalClass () {
      return this.roundedClass + ' ' + this.disabledClass + ' ' + this.colourClass
    }
  },
  methods: {
    onClick (e) {
      if (!this.disabled) {
        this.action(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
