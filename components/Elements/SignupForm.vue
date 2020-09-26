<template>
  <div class="container min-w-350 shadow-md bg-gray-100 mx-auto p-4 mt-8 block">
    <div class="grid grid-cols-12">
      <div @click="goBack" class="clickable col-span-2 border px-5 py-5">
        <arrow-left-circle-icon size="4x" />
      </div>
      <h1 class="col-span-8 text-6xl text-center">Sign up</h1>
    </div>

    <div class="max-w-350 block mx-auto">
      <Input v-model="userInformation.email" type="email" placeholder="you@youremail.com" label="Email">
      <mail-icon class="block mx-auto" />
      </Input>
      <p class="mb-5"><small>We will never share your email with anyone</small></p>
    </div>

    <div class="max-w-350 block mx-auto">
      <Input v-model="userInformation.name" type="text" placeholder="Your name" label="Display Name">
      <at-sign-icon class="block mx-auto" />
      </Input>
      <p class="mb-0"><small>Name can be anything up to 16 letters.</small></p>
      <p class="mb-5"><small>This doesn't have to be your real name, it can be anything you want to be known as (i.e. your band's name).</small></p>
    </div>

    <div class="max-w-350 block mx-auto">
      <Input v-model="userInformation.password" type="password" placeholder="Your password" label="Password">
      <key-icon class="block mx-auto" />
      </Input>
      <p class="mb-5"><small>Password must be atleast 8 characters long.</small></p>
    </div>

    <div class="max-w-350 block mx-auto">
      <Input v-model="userInformation.confirmPassword" type="password" placeholder="Confirm password" label="Confirm password">
      <key-icon class="block mx-auto" />
      </Input>
    </div>

    <div class="max-w-350 block mx-auto">
      <Checkbox v-model="userInformation.agreement">By clicking here you agree to the Terms of Use and the Privacy Policy</Checkbox>
    </div>

    <div @click="postSignupForm" class="clickable max-w-350 mx-auto bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded mt-8 m-5">
        Sign up
    </div>
  </div>
</template>

<script>
import { MailIcon, AtSignIcon, KeyIcon, ArrowLeftCircleIcon } from 'vue-feather-icons'

export default {
  components: {
    MailIcon,
    AtSignIcon,
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
      userInformation: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        agreement: false
      }
    }
  },
  methods: {
    postSignupForm () {
      console.log(JSON.stringify(this.userInformation))
      fetch('http://localhost:8080/users/new',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify(this.userInformation),
          credentials: 'include'
        })
        .then(res => res.json())
        .then(data => console.log(data))
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
