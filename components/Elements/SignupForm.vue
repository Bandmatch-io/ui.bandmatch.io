<template>
  <div class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block">
    <div class="w-full text-center">
      <h1 class="w-full text-6xl text-center">
        Sign up
      </h1>
      <p>Or <a class="clickable text-primary-300 underline" @click="switchView"><link-icon size="1x" class="inline-block" /> Log in</a> instead</p>
    </div>

    <div class="max-w-350 block mx-auto">
      <TextInput v-model="userInformation.email" type="email" placeholder="you@youremail.com" label="Email">
        <mail-icon class="block mx-auto" />
      </TextInput>
      <p class="mb-5">
        <small>We will never share your email with anyone</small>
      </p>
    </div>

    <div class="max-w-350 block mx-auto">
      <TextInput v-model="userInformation.name" type="text" placeholder="Your name" label="Display Name">
        <at-sign-icon class="block mx-auto" />
      </TextInput>
      <p class="mb-0">
        <small>Name can be anything up to 16 letters.</small>
      </p>
      <p class="mb-5">
        <small>This doesn't have to be your real name, it can be anything you want to be known as (i.e. your band's name).</small>
      </p>
    </div>

    <div class="max-w-350 block mx-auto">
      <TextInput v-model="userInformation.password" type="password" placeholder="Your password" label="Password">
        <key-icon class="block mx-auto" />
      </TextInput>
      <p class="mb-5">
        <small>Password must be atleast 8 characters long.</small>
      </p>
    </div>

    <div class="max-w-350 block mx-auto">
      <TextInput v-model="userInformation.confirmPassword" type="password" placeholder="Confirm password" label="Confirm password">
        <key-icon class="block mx-auto" />
      </TextInput>
    </div>

    <div class="max-w-350 block mx-auto">
      <Checkbox v-model="userInformation.agreement">
        By clicking here you agree to the Terms of Use and the Privacy Policy
      </Checkbox>
    </div>

    <div class="max-w-350 block mx-auto">
      <Checkbox v-model="userInformation.agreement">
        Opt-in for email communications about BandMatch.io and it's products?
      </Checkbox>
    </div>

    <ButtonPrimary :action="postSignupForm" class="max-w-350 block mx-auto">
      Sign up
    </ButtonPrimary>
  </div>
</template>

<script>
import { MailIcon, AtSignIcon, KeyIcon, LinkIcon } from 'vue-feather-icons'
import ButtonPrimary from '~/components/Core/ButtonPrimary'

export default {
  components: {
    MailIcon,
    AtSignIcon,
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
      fetch('http://localhost:8080/auth/new',
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
        .then((data) => {
          if (data.success) {
            window.location.href = '/profile/setup'
          }
        })
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
