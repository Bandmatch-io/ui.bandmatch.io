<template>
  <div class="bg-polka">
    <div v-if="state===states.loading">
      <div class="block mx-auto w-1/2 md:w-1/4 h-24 md:h-48" style="transform: translateY(25vh);">
        <LoaderAnim />
      </div>
    </div>
    <div v-else />
  </div>
</template>

<script>
import LoaderAnim from '~/components/Core/LoaderAnim'
export default {
  components: {
    LoaderAnim
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
