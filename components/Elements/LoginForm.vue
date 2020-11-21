<template>
  <div class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block">
    <div class="w-full text-center">
      <h1 class="w-full text-6xl text-center">
        Log in
      </h1>
      <p>Or <a class="clickable text-primary-300 underline" @click="switchView"><link-icon size="1x" class="inline-block" /> Sign up</a> instead</p>
    </div>

    <form @submit="postLoginForm">
      <div class="max-w-350 block mx-auto">
        <TextInput v-model="loginDetails.email" type="email" placeholder="you@youremail.com" label="Email" autofill="email">
          <mail-icon class="block mx-auto" />
        </TextInput>
        <TextError v-if="errors.email && errors.email.invalid">
          Email is incorrect.
        </TextError>
        <TextError v-if="errors.email && errors.email.missing">
          Email is invalid.
        </TextError>
      </div>

      <div class="max-w-350 block mx-auto mb-2">
        <TextInput v-model="loginDetails.password" type="password" placeholder="Your password" label="Password" autofill="current-password">
          <key-icon class="block mx-auto" />
        </TextInput>
        <TextError v-if="errors.password && errors.password.incorrect">
          Password is incorrect.
        </TextError>
        <TextError v-if="errors.password && errors.password.missing">
          Password is invalid.
        </TextError>
      </div>
      <div class="max-w-350 block mx-auto w-full">
        <p class="text-center w-full">
          <a class="clickable text-primary-300 underline" @click="switchToReset"><link-icon size="1x" class="inline-block" /> Forgotten your password?</a>
        </p>
      </div>

      <ButtonPrimary v-if="state===states.default" :action="()=>{}" class="max-w-350 mx-auto w-full my-3">
        Log in
      </ButtonPrimary>
      <div v-else class="block w-1/2 h-12 md:h-24 mx-auto">
        <LoaderAnim />
      </div>
    </form>
  </div>
</template>

<script>
import { MailIcon, KeyIcon, LinkIcon } from 'vue-feather-icons'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import TextError from '~/components/Core/TextError'
import LoaderAnim from '~/components/Core/LoaderAnim'

export default {
  components: {
    MailIcon,
    KeyIcon,
    LinkIcon,
    ButtonPrimary,
    TextError,
    LoaderAnim
  },
  props: {
    switchView: Function,
    switchToReset: Function
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      loginDetails: {
        email: '',
        password: ''
      },
      errors: {
        email: { missing: false, invalid: false },
        password: { missing: false, incorrect: false }
      }
    }
  },
  methods: {
    postLoginForm (e) {
      e.preventDefault()
      this.resetErrors()
      this.state = this.states.loading

      this.$auth.loginWith('local', { data: this.loginDetails })
        .then((res) => {
          this.$store.commit('toasts/create', { title: 'User', message: 'You have successfully logged in' })
          this.$router.push('/')
        })
        .catch((e) => {
          this.state = this.states.default
          const data = e.response.data
          if (data.error) {
            this.errors = data.error
            console.log(JSON.stringify(this.errors))
          }
        })
    },
    switchToPassReset () {
      this.$emit('request')
    },
    goBack () {
      this.$emit('return')
    },
    resetErrors () {
      this.errors = {
        email: { missing: false, invalid: false },
        password: { missing: false, incorrect: false }
      }
    }
  }
}
</script>

<style lang="scss" scoped >
@import '~/assets/scss/styles.scss';
</style>
