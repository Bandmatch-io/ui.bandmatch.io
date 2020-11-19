<template>
  <nuxt-link :to="link" class="inline-block mx-8 my-5">
    <div class="w-48 rounded border bg-white overflow-hidden shadow" :class="{'clickable hover:shadow-outline hover:bg-gray-100': link !== ''}">
      <div class="px-6 py-2 border-t bg-primary-grad">
        <div class="font-bold text-lg mb-2 text-center text-white">
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
    title: { type: String, default () { return '' } },
    link: { type: String, default () { return '' } }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
