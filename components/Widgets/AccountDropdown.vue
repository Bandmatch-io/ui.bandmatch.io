<template>
  <div class="relative">
    <button @click="isOpen = !isOpen" class="relative z-10 inline-block rounded py-1 px-3 overflow-hidden border-2 border-gray-300 focus:outline-none hover:border-white focus:border-white">
      <p class=""><user-icon class="inline-block" /><span class="hidden md:inline-block">{{ user.displayName }} <chevron-down-icon class="inline-block" /></span></p>
    </button>
    <div>
      <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="z-40 fixed inset-0 h-full w-full bg-black opacity-75 cursor-default"></button>
      <div v-if="isOpen" class="z-50 absolute right-0 mt-2 py-2 w-screen lg:w-48 max-w-350 bg-white rounded shadow-xl">
        <p class="text-gray-500 font-bold block px-4 py-2 mb-5 border-b shadow">{{ user.displayName }}</p>
        <nuxt-link @click.native="isOpen = false" to="/profile/edit" class="text-gray-500 block px-4 py-2 hover:bg-primary-300 hover:text-white">
          View Profile
        </nuxt-link>
        <a href="#" class="text-gray-500 block px-4 py-2 hover:bg-primary-300 hover:text-white">Sign out</a>
      </div>
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
