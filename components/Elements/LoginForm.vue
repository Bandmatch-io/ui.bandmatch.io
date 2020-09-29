<template>
  <div class="container min-w-350 shadow-md bg-gray-100 mx-auto p-4 mt-8 block">
    <div class="grid grid-cols-12">
      <div @click="goBack" class="clickable col-span-2 border px-5 py-5">
        <arrow-left-circle-icon size="4x" />
      </div>
      <h1 class="col-span-8 text-6xl text-center">Log in</h1>
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

    <div @click="postLoginForm" class="clickable max-w-350 mx-auto bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded mt-8 m-5">
        Log in
    </div>
  </div>
</template>

<script>
import { MailIcon, KeyIcon, ArrowLeftCircleIcon } from 'vue-feather-icons'
import { mapMutations } from 'vuex'

export default {
  components: {
    MailIcon,
    KeyIcon,
    ArrowLeftCircleIcon
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
    postLoginForm () {
      fetch('http://localhost:8080/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.loginDetails),
          credentials: 'include'
        })
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            this.$store.commit('user/logIn', JSON.stringify(data.user))
            window.location.href = '/'
          }
        })
    },
    goBack () {
      this.$emit('return')
    },
    ...mapMutations({
      logIn: 'user/logIn'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
