<template>
  <div>
    <label class="py-2 pl-0 w-full block p-4">{{ label }}</label>
    <div class="mb-4 shadow grid grid-cols-12 grid-flow-col gap-0">
      <div class="col-span-2 block border rounded-l bg-primary-grad py-2">
        <label for="username">
          <slot />
        </label>
      </div>
      <input
        ref="inputField"
        :value="value"
        type="date"
        class="col-span-10 appearance-none border rounded-r py-2 px-3 text-black leading-tight ring-primary-200 ring-0 focus:ring ring-opacity-50"
        @change="onChange"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default () { return '' } },
    value: { type: String, default () { return '' } }
  },
  methods: {
    onChange () {
      this.$emit('input', this.$refs.inputField.value)
      this.$emit('change', this.$refs.inputField.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
