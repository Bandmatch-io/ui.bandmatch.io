<template>
  <div class="bg-polka">
    <div class="flex-container">
      <ProfileCard v-for="match in matches" :key="match._id" :user="match" />
    </div>
    <div v-cloak v-if="matches.length === 0" class="w-full block mx-auto my-8 prose text-center">
      <h1>There is no-one around you</h1>
      <p>Maybe try editing your profile?</p>
      <nuxt-link to="/profile/edit">Edit your profile</nuxt-link>
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
      matches: []
    }
  },
  mounted () {
    this.loadMatches()
  },
  methods: {
    loadMatches () {
      fetch('http://localhost:8080/search',
        {
          method: 'GET',
          credentials: 'include'
        })
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            this.matches = data.matches
          } else {
            console.log(data)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
