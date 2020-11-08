<template>
  <nav class="flex items-center h-20 justify-between flex-wrap bg-primary-grad p-4">
    <nuxt-link to="/">
      <span class="text-white text-2xl tracking-tight">Bandmatch</span>
    </nuxt-link>
    <div v-if="loggedIn">
      <div class="block hidden">
        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" @click="isOpen = !isOpen">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow flex lg:items-center lg:w-auto leading-none">
        <div class="mx-1 lg:flex-grow">
          <nuxt-link to="/conversations" class="ml-1 mt-3 mr-1 md:ml-3 md:mr-3 inline-block text-xl lg:mt-0 text-gray-100 hover:text-white">
            <div v-if="unreadCount > 0" class="rounded bg-complementary-300 text-secondary-300 w-5 h-5 p-0 inline-block text-center">
              <small>{{ unreadCount }}</small>
            </div>
            <message-square-icon size="1.5x" class="inline-block" /> <span class="hidden md:inline-block">Messages</span>
          </nuxt-link>
        </div>
        <AccountDropdown class="inline-block px-4 py-2 leading-none" />
      </div>
    </div>
    <div v-else-if="!isLoginPage">
      <nuxt-link to="/account" class="inline-block text-l px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
        <user-icon class="inline-block" /> <span class="hidden md:inline-block">Log in</span>
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import { MessageSquareIcon, UserIcon } from 'vue-feather-icons'

export default {
  components: {
    MessageSquareIcon,
    UserIcon
  },
  data () {
    return {
      isOpen: false,
      isLoginPage: this.$route.path === '/account'
    }
  },
  computed: {
    user () {
      if (this.$auth.user === null) {
        return undefined
      }
      return this.$auth.user
    },
    loggedIn () {
      return this.$auth.loggedIn
    },
    unreadCount () {
      return this.$store.state.unread.count
    }
  },
  mounted () {
    this.$axios.get('/conversations/unread')
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          // this.unreadCount = res.data.count
          this.$store.commit('unread/setUnread', res.data.count)
        }
      })
      .catch(e => console.log(e))
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
