<template>
  <div class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block">
    <div class="w-full text-center">
      <h1 class="w-full text-6xl text-center">
        Sign up
      </h1>
      <p>Or <a class="clickable text-primary-300 underline" @click="switchView"><link-icon size="1x" class="inline-block" /> Log in</a> instead</p>
    </div>
    <form @submit="postSignupForm">
      <div class="max-w-350 block mx-auto">
        <TextInput v-model="userInformation.email" type="email" placeholder="you@youremail.com" label="Email">
          <mail-icon class="block mx-auto" />
        </TextInput>
        <TextError v-if="errors.email && errors.email.inUse">
          Email is already in use
        </TextError>
        <TextError v-if="errors.email && errors.email.invalid">
          Email is invalid
        </TextError>
        <p class="mb-5">
          <small>We will never share your email with anyone</small>
        </p>
        </texterror>
      </div>

      <div class="max-w-350 block mx-auto">
        <TextInput v-model="userInformation.name" type="text" placeholder="Your name" label="Display Name">
          <at-sign-icon class="block mx-auto" />
        </TextInput>
        <TextError v-if="errors.name && errors.name.invalid">
          Display name is invalid
        </TextError>
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
        <TextError v-if="errors.password && errors.password.invalid">
          Password is invalid
        </TextError>
        <p class="mb-5">
          <small>Password must be atleast 8 characters long.</small>
        </p>
      </div>

      <div class="max-w-350 block mx-auto">
        <TextInput v-model="userInformation.confirmPassword" type="password" placeholder="Confirm password" label="Confirm password">
          <key-icon class="block mx-auto" />
        </TextInput>
        <TextError v-if="errors.password && errors.password.mismatch">
          Passwords do not match
        </TextError>
      </div>

      <div class="max-w-350 block mx-auto">
        <Checkbox v-model="userInformation.agreement">
          By clicking here you agree to the Terms of Use and the Privacy Policy
        </Checkbox>
        <TextError v-if="errors.consent && errors.consent.missing">
          You must give consent to create an account.
        </TextError>
      </div>

      <div class="max-w-350 block mx-auto">
        <Checkbox v-model="userInformation.agreement">
          Opt-in for email communications about BandMatch.io and it's products?
        </Checkbox>
      </div>

      <ButtonPrimary v-if="state===states.default" :action="() => {}" class="max-w-350 mx-auto w-full">
        Sign up
      </ButtonPrimary>
      <div v-else class="block w-1/2 h-24 mx-auto">
        <LoaderAnim />
      </div>
    </form>
  </div>
</template>

<script>
import { MailIcon, AtSignIcon, KeyIcon, LinkIcon } from 'vue-feather-icons'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import TextError from '~/components/Core/TextError'

export default {
  components: {
    MailIcon,
    AtSignIcon,
    KeyIcon,
    LinkIcon,
    TextError,
    ButtonPrimary
  },
  props: {
    switchView: Function
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      userInformation: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        agreement: false
      },
      errors: {
        consent: {
          missing: false
        },
        email: {
          invalid: false,
          inUse: false
        },
        name: {
          invalid: false
        },
        password: {
          mismatch: false,
          invalid: false
        }
      }
    }
  },
  methods: {
    postSignupForm (e) {
      e.preventDefault()
      this.resetErrors()
      this.state = this.states.loading
      this.$axios.post('/auth/new', this.userInformation)
        .then((res) => {
          if (res.data.success) {
            this.$auth.setUserToken(res.data.token.token)
            window.location.href = '/profile/setup'
          }
        })
        .catch((e) => {
          const data = e.response.data
          this.state = this.states.default
          if (data.error) {
            this.errors = data.error
          }
        })
    },
    resetErrors () {
      this.errors = {
        consent: { missing: false },
        email: { invalid: false, inUse: false },
        name: { invalid: false },
        password: { mismatch: false, invalid: false }
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
