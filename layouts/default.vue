<template>
  <div>
    <Navbar :user="currentUser"/>
    <Nuxt  />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      currentUser: undefined
    }
  },
  mounted () {
    fetch('http://localhost:8080/users/profile',
      {
        method: 'GET',
        credentials: 'include'
      })
      .then(res => res.json())
      .then((data) => {
        if (data.success) {
          this.currentUser = data.user
          console.log(JSON.stringify(this.currentUser))
        }
      })
    console.log(this.$route)
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
