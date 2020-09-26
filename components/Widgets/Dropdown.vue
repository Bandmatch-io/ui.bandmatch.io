<template>
  <div class="relative">
    <button @click="isOpen = !isOpen" class="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
      <user-icon class="inline-block" />
    </button>
    <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"></button>
    <div v-if="isOpen" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
      <p class="block px-4 py-2 text-gray-800 mb-5 border-b shadow">{{ name }}</p>
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">View Profile</a>
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Support</a>
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Sign out</a>
    </div>
  </div>
</template>

<script>
import { UserIcon } from 'vue-feather-icons'

export default {
  components: {
    UserIcon
  },
  props: {
    name: String
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
