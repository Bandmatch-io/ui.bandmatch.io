<template>
  <div class="flex-container bg-polka">
    <div class="prose block mx-auto my-5 p-2">
      <h1>Why do we only support Spotify URLs?</h1>
      <small>
        <p>
          <nuxt-link class="clickable text-primary-300 hover:text-secondary-300 hover:underline" to="/profile/audioedit">
            <link-icon size="1x" class="inline-block mr-1" />Go back
          </nuxt-link>
        </p>
      </small>
      <p>It essentially boils down to two reasons:</p>
      <ul>
        <li>Soundcloud's URLs won't work for us, and it's developer API is no longer accepting new apps.</li>
        <li>I don't use any other streaming service</li>
      </ul>
      <p>
        If you would like to suggest a streaming service I'll take note of it, and if there's enough demand I'll include it.
        <nuxt-link class="clickable text-primary-300 hover:text-secondary-300 hover:underline" to="/feedback">
          <link-icon size="1x" class="inline-block mr-1" />feedback section
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { LinkIcon } from 'vue-feather-icons'

export default {
  components: {
    LinkIcon
  },
  auth: false,
  head () {
    return {
      title: 'About Us | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'About Us | Bandmatch' }
        // other meta
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
