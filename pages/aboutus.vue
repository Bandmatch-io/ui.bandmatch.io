<template>
  <div class="flex-container bg-polka">
    <div class="prose block mx-auto my-5 p-2">
      <h1>About us</h1>
      <p>Welcome to BandMatch! Our goal here is to help you find your next band is easily as possible.</p>
      <p>We do this by avoiding the usual method of classified sections, and instead show you exactly the users who are interested in playing with you. So instead of writing an ad for the hundredth time, just list the genres, instruments you want to play and where you want to play, and we'll show you everyone in the area that matches your criteria.</p>
      <p>
        We are always looking for ways to improve this website, so if you have ideas please head to the
        <nuxt-link to="/feedback">
          <link-icon size="1x" class="inline-block mr-1" />feedback section
        </nuxt-link> and tell us all about them.
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
