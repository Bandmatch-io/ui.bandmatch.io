<template>
  <nuxt-link :to="link" class="inline-block m-8">
    <div class="clickable w-48 hover:shadow-outline hover:bg-gray-100 rounded border bg-white overflow-hidden shadow">
      <div class="px-6 py-4 border-t bg-primary-grad">
        <div class="font-bold text-xl mb-2 text-center text-white">
          {{ title }}
        </div>
      </div>
      <div class="shadow-inner text-center">
        <slot />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: String,
    link: String
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
