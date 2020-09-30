<template>
  <div>
    <label class="py-2 pl-0 w-full block p-4">{{ label }}</label>
    <div class="mb-4 shadow grid grid-cols-12 grid-flow-col gap-0">
      <div class="col-span-2 block border rounded-l bg-primary-grad">
        <div class="py-2 px-3 w-full text-center block text-sm font-bold p-4" for="username">
          <slot />
        </div>
      </div>
      <input
        ref="inputField"
        @change="onChange"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        class="col-span-10 appearance-none border rounded-r py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    placeholder: String,
    label: String,
    value: String
  },
  methods: {
    onChange () {
      this.$emit('input', this.$refs.inputField.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/colours.scss';

.bg-primary-grad {
  background: $color-primary-0;
  background: $primary-gradient;
  color: white !important;
}
</style>
