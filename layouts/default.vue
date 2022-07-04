<template>
  <div>
    <div class="flex flex-col min-h-screen">
      <Navbar />
      <Nuxt class="flex-grow" />
      <Footer />
    </div>
    <Toast />
    <ReportModal />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  },
  computed: {
    bodyClass () {
      if (this.$store.state.reports.active) {
        return 'overflow-y-hidden h-screen'
      }
      return ''
    }
  },
  watch: {
    $route () {
      this.getUnread()
    }
  },
  mounted () {
    if (this.$route.query.ref) {
      this.$axios.post(`/ref?r=${this.$route.query.ref}`)
    }

    this.getUnread()
    // setInterval(this.getUnread, 60 * 1000)
  },
  methods: {
    getUnread () {
      this.$axios.get('/msgs/unread')
        .then((res) => {
          if (res.data.success) {
            this.$store.commit('unread/setUnread', res.data.count)
          }
        })
        .catch(() => {
          if (this.$auth.user !== null) {
            this.$store.commit('toasts/create', { title: 'Messages', message: 'Could not fetch unread message count.', type: 'error' })
          }
        })
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: this.bodyClass
      }
    }
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
