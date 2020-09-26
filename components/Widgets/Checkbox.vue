<template>
  <div @click="checked=!checked" style="cursor: pointer;" class="grid grid-cols-12 grid-flow-col">
    <div class="col-span-2">
      <div class="rounded shadow checkbox" :data-checked="checked" />
    </div>
    <div class="col-span-10">
      <p class="text-sm"><slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String
  },
  data () {
    return {
      checked: false
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

.checkbox[data-checked="true"] {
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
