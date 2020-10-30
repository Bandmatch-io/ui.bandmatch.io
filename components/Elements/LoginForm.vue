<template>
  <div class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block">
    <div class="w-full text-center">
      <h1 class="w-full text-6xl text-center">
        Log in
      </h1>
      <p>Or <a class="clickable text-primary-300 underline" @click="switchView"><link-icon size="1x" class="inline-block" /> Sign in</a> instead</p>
    </div>

    <div class="max-w-350 block mx-auto">
      <TextInput v-model="loginDetails.email" type="email" placeholder="you@youremail.com" label="Email">
        <mail-icon class="block mx-auto" />
      </TextInput>
    </div>

    <div class="max-w-350 block mx-auto">
      <TextInput v-model="loginDetails.password" type="password" placeholder="Your password" label="Password">
        <key-icon class="block mx-auto" />
      </TextInput>
    </div>

    <ButtonPrimary :action="postLoginForm" class="clickable max-w-350 mx-auto bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded mt-8 m-5">
      Log in
    </ButtonPrimary>
  </div>
</template>

<script>
import { MailIcon, KeyIcon, LinkIcon } from 'vue-feather-icons'
import ButtonPrimary from '~/components/Core/ButtonPrimary'

export default {
  components: {
    MailIcon,
    KeyIcon,
    LinkIcon,
    ButtonPrimary
  },
  props: {
    switchView: Function
  },
  data () {
    return {
      states: {
        default: 0,
        login: 1,
        signup: 2,
        password: 3
      },
      state: 0,
      loginDetails: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async postLoginForm () {
      try {
        const res = await this.$auth.loginWith('local', { data: this.loginDetails })
        console.log('login res', res)
      } catch (err) {
        console.log('login err', err)
      }
    },
    goBack () {
      this.$emit('return')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
