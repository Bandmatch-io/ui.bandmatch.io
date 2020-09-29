<template>
    <option @click="OnSelect"><slot /></option>
</template>

<script>
export default {
  props: {
    OnSelect: Function,
    value: String
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
