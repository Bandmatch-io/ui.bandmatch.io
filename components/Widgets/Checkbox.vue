<template>
  <div style="cursor: pointer;" class="grid grid-cols-12 grid-flow-col" @click="setChecked(!checked)">
    <div class="col-span-2">
      <div class="rounded shadow checkbox" :class="{ 'checked': checked }" />
    </div>
    <div class="col-span-10">
      <p class="text-sm">
        <slot />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default () { return '' } },
    value: { type: Boolean, default () { return false } }
  },
  data () {
    return {
      checked: false
    }
  },
  mounted () {
    this.checked = this.value
  },
  methods: {
    setChecked (state) {
      this.checked = state
      this.$emit('input', state)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;

  background-color: #444;

  &:after {
    content: "";
    position: relative;
    display: block;
    border-radius: 0.25rem;
    top: 8px;
    left: 8px;
    width: 16px;
    height: 16px;
    background-color: $color-off-white;
    opacity: 0;
  }
}

.checkbox.checked {
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;

  background: $primary-gradient;

  &:after {
    opacity: 1;
  }
}
</style>
