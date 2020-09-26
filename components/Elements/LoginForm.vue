<template>
  <div class="container min-w-350 shadow bg-gray-100 mx-auto p-4 mt-8 block">
    <div class="max-w-350 block mx-auto">
      <Input type="email" placeholder="you@youremail.com" label="Email">
        <mail-icon class="block mx-auto" />
      </Input>
    </div>

    <div class="max-w-350 block mx-auto">
      <Input type="password" placeholder="Your password" label="Password">
        <key-icon class="block mx-auto" />
      </Input>
    </div>

    <div class="max-w-350 mx-auto bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded mt-8 m-5">
        Log in
    </div>
  </div>
</template>

<script>
import { MailIcon, KeyIcon } from 'vue-feather-icons'

export default {
  components: {
    MailIcon,
    KeyIcon
  },
  data () {
    return {
      states: {
        default: 0,
        login: 1,
        signup: 2,
        password: 3
      },
      state: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
