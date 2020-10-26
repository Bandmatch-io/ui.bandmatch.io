<template>
  <div class="relative">
    <button class="relative z-10 inline-block rounded py-1 px-3 overflow-hidden border-2 border-gray-300 focus:outline-none hover:border-white focus:border-white" @click="isOpen = !isOpen">
      <p class="">
        <user-icon class="inline-block" /><span class="hidden md:inline-block">{{ user.displayName }} <chevron-down-icon class="inline-block" /></span>
      </p>
    </button>
    <div>
      <button v-if="isOpen" tabindex="-1" class="z-40 fixed inset-0 h-full w-full bg-black opacity-75 cursor-default" @click="isOpen = false" />
      <div v-if="isOpen" class="z-50 fixed inset-x-0 mt-2 py-2 mx-auto w-screen md:absolute md:w-48 md:right-0 md:inset-x-auto bg-white rounded shadow-xl">
        <p class="text-gray-500 font-bold block px-4 py-2 mb-5 border-b shadow">
          {{ user.displayName }}
        </p>
        <nuxt-link to="/profile/edit" class="text-gray-500 block px-4 py-2 bg-primary-grad-hov hover:text-white" @click.native="isOpen = false">
          View Profile
        </nuxt-link>
        <a href="#" class="text-gray-500 block px-4 py-2 bg-primary-grad-hov hover:text-white">Sign out</a>
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
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user.currentUser
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

.bg-primary-grad-hov:hover {
  background: $primary-gradient;
}
</style>
