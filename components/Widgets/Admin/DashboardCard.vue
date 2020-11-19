<template>
  <nuxt-link :to="link" class="inline-block mx-4 md:mx-8 my-2 md:my-5">
    <div class="w-32 md:w-48 rounded border bg-white overflow-hidden shadow" :class="{'clickable ring-primary-200 ring-0 hover:ring ring-opacity-50 hover:bg-gray-100': link !== ''}">
      <div class="px-1 py-2 rounded-t bg-primary-grad">
        <div class="font-bold text-lg mb-2 text-center text-white">
          {{ title }}
        </div>
      </div>
      <div class="text-center">
        <slot />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: { type: String, default () { return '' } },
    link: { type: String, default () { return '' } }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
