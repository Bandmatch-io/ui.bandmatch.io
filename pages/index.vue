<template>
  <div class="bg-polka">
    <div class="flex-container">
      <ProfileCard v-for="match in matches" :key="match._id" :user="match" />
    </div>
    <div v-cloak v-if="matches.length === 0" class="w-full block mx-auto my-8 prose text-center">
      <h1>There is no-one around you</h1>
      <p>Maybe try editing your profile?</p>
      <nuxt-link to="/profile/edit">
        Edit your profile
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import ProfileCard from '~/components/Elements/ProfileCard'
export default {
  components: {
    ProfileCard
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      matches: []
    }
  },
  mounted () {
    this.loadMatches()
  },
  methods: {
    loadMatches () {
      this.state = this.states.loading
      this.$axios.get('/search')
        .then((res) => {
          this.state = this.states.default
          if (res.data.success) {
            this.matches = res.data.matches
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
