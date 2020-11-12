<template>
  <div class="fixed inset-0 overflow-hidden z-40 pt-20 pointer-events-none">
    <div v-for="toast in toasts" :key="toast._id" class="pointer-events-auto mx-auto md:ml-5 md:mr-auto mt-5 block w-25 max-w-250 bg-white h-24 border rounded shadow-xl">
      <div class="text-white h-12 p-3 bg-secondary-grad rounded-t">
        <p class="float-left">
          <bell-icon class="inline-block mr-2" />{{ toast.title }}
        </p>
        <p class="float-right" @click="destroy(toast._id)">
          <x-icon class="inline-block fill-current text-white hover:text-gray-300 mx-2 mb-2" />
        </p>
      </div>
      <div class="h-12 p-3">
        <p>
          {{ toast.message }}
        </p>
      </div>
    </div>
  </div>
</template>
max-w-
<script>
import { BellIcon, XIcon } from 'vue-feather-icons'

export default {
  components: {
    BellIcon,
    XIcon
    // XSquareIcon
  },
  computed: {
    toasts () {
      return this.$store.state.toasts.list
    }
  },
  methods: {
    destroy (id) {
      this.$store.commit('toasts/destroy', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
