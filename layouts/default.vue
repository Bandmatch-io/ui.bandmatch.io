<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    }
  },
  mounted () {
    this.$store.commit('user/setStatus', 'loading')
    fetch('http://localhost:8080/users/profile',
      {
        method: 'GET',
        credentials: 'include'
      })
      .then(res => res.json())
      .then((data) => {
        if (data.success) {
          this.$store.commit('user/logIn', JSON.stringify(data.user))
          this.$store.commit('user/setStatus', 'success')
        } else {
          this.$store.commit('user/setStatus', 'failure')
        }
      })
  },
  methods: {
    ...mapMutations({
      logIn: 'user/logIn',
      setStatus: 'user/setStatus'
    })
  }
}
</script>

<style lang="scss" scoped>
html {
  font-family: 'Roboto', 'Open Sans', 'Noto Sans JP', 'Lato', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
