<template>
  <div class="bg-polka">
    <div class="">
      <div class="block mx-auto w-1/2 max-w-350 h-48">
        <LoaderAnim />
      </div>
    </div>
  </div>
</template>

<script>
import LoaderAnim from '~/components/Core/LoaderAnim'
export default {
  components: {
    LoaderAnim
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
