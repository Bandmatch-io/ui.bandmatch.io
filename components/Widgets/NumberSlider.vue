<template>
  <div class="inline-block relative w-full rounded grid grid-cols-8 border shadow p-4 bg-white">
    <small class="col-span-2 text-md">{{ input }} {{ units }}</small>
    <input
      v-model="input"
      type="range"
      class="col-span-6 w-full bg-white"
      :min="min"
      :max="max"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number, default () { return 0 } },
    units: { type: String, default () { return 'km' } },
    min: { type: Number, default () { return 0 } },
    max: { type: Number, default () { return 100 } }
  },
  data () {
    return {
      input: 0
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.input = Number(val)
      }
    },
    input: {
      immediate: true,
      handler (val) {
        this.$emit('input', Number(val))
      }
    }
  },
  methods: {
    emitChange () {
      this.$emit('input', Number(this.input))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';

// input[type=range] {
input[type=range]::-ms-thumb, input[type=range]::-moz-range-thumb,
input[type=range]::-webkit-slider-thumb, input[type=range]::-webkit-slider-runnable-track {
  border-radius: 100%;
  height: 1rem;
  width: 1rem;
  border: 0;
}
// }

input[type=range]::-moz-range-track,
input[type=range]::-webkit-range-track {
    width: 100%;
    height: .5rem;
    color: transparent;
    cursor: pointer;
    background-color: $color-secondary-300;
    border-color: transparent;
    border-radius: 1rem;
    appearance: none;
}
</style>
