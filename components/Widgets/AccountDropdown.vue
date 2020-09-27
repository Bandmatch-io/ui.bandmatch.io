<template>
  <div class="relative">
    <button @click="isOpen = !isOpen" class="relative z-10 block rounded py-1 px-3 overflow-hidden border-2 border-gray-600 focus:outline-none hover:border-white focus:border-white">
      <p class="text-white"><user-icon class="inline-block" /> {{ user.displayName }} <chevron-down-icon class="inline-block" /></p>
    </button>
    <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"></button>
    <div v-if="isOpen" class="absolute lg:right-0 mt-2 py-2 w-screen lg:w-48 max-w-350 bg-white rounded shadow-xl">
      <p class="block px-4 py-2 text-gray-800 mb-5 border-b shadow">{{ user.displayName }}</p>
      <nuxt-link @click="isOpen = false" to="/profile/edit" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
        View Profile
      </nuxt-link>
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Sign out</a>
    </div>
  </div>
</template>

<script>
import { UserIcon, ChevronDownIcon } from 'vue-feather-icons'

export default {
  components: {
    UserIcon,
    ChevronDownIcon
  },
  computed: {
    user () {
      return this.$store.state.user.currentUser
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  mounted () {
    const handleEscape = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false
      }
    }
    document.addEventListener('keydown', handleEscape)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
