<template>
  <div class="inline-block relative w-full grid grid-cols-8 border shadow p-4">
    <small class="col-span-2 text-md">{{ input }} {{ units }}</small>
    <input
      @change="emitChange"
      v-model="input"
      type="range"
      class="col-span-6 w-full bg-white"
      :min="min"
      :max="max" />
  </div>
</template>

<script>
export default {
  props: [
    'value',
    'units',
    'min',
    'max'
  ],
  data () {
    return {
      input: 0
    }
  },
  watch: {
    value (newVal) {
      this.input = newVal
    }
  },
  methods: {
    emitChange () {
      this.$emit('input', this.input)
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

input[type=range]::-moz-range-track {
    width: 100%;
    height: .5rem;
    color: transparent;
    cursor: pointer;
    background-color: $color-primary-0;
    border-color: transparent;
    border-radius: 1rem;
    appearance: none;
}
</style>
