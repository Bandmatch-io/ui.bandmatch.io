<template>
  <div class="bg-polka">
    <div v-if="state===states.loading">
      <div class="block mx-auto w-1/2 md:w-1/4 h-24 md:h-48" style="transform: translateY(25vh);">
        <LoaderAnim />
      </div>
    </div>
    <div v-else>
      <div class="flex-container">
        <ProfileCard v-for="match in matches" :key="match._id" :user="match" class="mx-auto md:mx-5 my-5 block md:inline-block"/>
      </div>
      <div v-cloak v-if="matches.length === 0" class="w-full block mx-auto my-8 prose text-center">
        <h1>No results</h1>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from '~/components/Elements/ProfileCard'
import LoaderAnim from '~/components/Core/LoaderAnim'
export default {
  components: {
    ProfileCard,
    LoaderAnim
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 1,
      matches: []
    }
  },
  mounted () {
    this.loadMatches()
  },
  methods: {
    loadMatches () {
      this.state = this.states.loading
      this.$axios.get(`/admin/users/searchas?uid=${this.$route.query.uid === undefined ? '' : this.$route.query.uid}`)
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
