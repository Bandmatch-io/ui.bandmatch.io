<template>
  <div class="bg-polka">
    <div class="flex flex-wrap">
      <div class="w-full block mx-auto my-8 lg:w-1/3 bg-gray-100 rounded shadow">
        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p>E-Mail</p>
          </div>
          <div class="col-span-3">
            <p>{{ user.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            Password
          </div>
          <div class="col-span-3">
            <div class="rounded border bg-blue-800 text-white text-center py-2 hover:bg-blue-700">
              <p class="inline-block text-lg"><key-icon class="inline-block"/> Update Password</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p>Display Name</p>
            <p><small>Max 16 characters </small></p>
          </div>
          <div class="col-span-3">
            <TextInput type="text">
              <at-sign-icon class="block mx-auto" />
            </TextInput>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p>Genres</p>
            <p></p>
          </div>
          <div class="col-span-3">
            <ArrayInput v-model="genres" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { AtSignIcon, KeyIcon } from 'vue-feather-icons'

export default {
  components: {
    AtSignIcon,
    KeyIcon
  },
  data () {
    return {
      genres: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    console.log(JSON.stringify(this.user))
  }
}
</script>

<style>

</style>
