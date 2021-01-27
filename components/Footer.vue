<template>
  <div class="text-center text-white w-full bg-gray-500 grid grid-cols-1 md:grid-cols-2">
    <ul class="col-span-1 w-full grid grid-cols-4">
      <li class="inline-block col-span-1 underline p-1">
        <nuxt-link to="/about">
          About <span class="hidden md:inline">us</span>
        </nuxt-link>
      </li>
      <li class="inline-block col-span-1 underline p-1">
        <nuxt-link to="/feedback">
          Feedback
        </nuxt-link>
      </li>
      <li class="inline-block col-span-1 underline p-1">
        <nuxt-link to="/privacy">
          Privacy <span class="hidden md:inline">Policy</span>
        </nuxt-link>
      </li>
      <li class="inline-block col-span-1 underline p-1">
        <nuxt-link to="/terms">
          Terms <span class="hidden md:inline">of use</span>
        </nuxt-link>
      </li>
    </ul>
    <p class="col-span-1">
      &copy; Bandmatch.io
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
import { MessageSquareIcon, UserIcon } from 'vue-feather-icons'
