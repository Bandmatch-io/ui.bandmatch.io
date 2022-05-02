<template>
  <div class="flex-container bg-polka">
    <div class="my-5 w-3/4 max-w-2xl mx-auto">
      <div class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block">
        <div class="w-full text-center">
          <h1 class="w-full text-3xl md:text-6xl text-center mb-2">
            Reset password
          </h1>
        </div>

        <form @submit="postPasswordDetails">
          <div class="max-w-350 block mx-auto">
            <TextInput v-model="passwordDetails.password" type="password" placeholder="Your password" label="Password" autofill="new-password">
              <key-icon class="block mx-auto" />
            </TextInput>
            <TextError v-if="errors.password && errors.password.invalid">
              Password is invalid.
            </TextError>
          </div>

          <div class="max-w-350 block mx-auto mb-2">
            <TextInput v-model="passwordDetails.confirmPassword" type="password" placeholder="Your password" label="Confirm Password" autofill="new-password">
              <key-icon class="block mx-auto" />
            </TextInput>
            <TextError v-if="errors.password && errors.password.mismatch">
              Password do not match.
            </TextError>
          </div>

          <div class="max-w-350 block mx-auto mb-2">
            <TextError v-if="errors.token && errors.token.expired">
              Token has expired.
            </TextError>
            <TextError v-if="errors.token && errors.token.invalid">
              Token is invalid.
            </TextError>
          </div>

          <Button v-if="state===states.default" :action="()=>{}" class="max-w-350 mx-auto w-full my-2">
            Update password
          </Button>
          <div v-else class="block w-1/2 h-12 md:h-24 mx-auto">
            <LoaderAnim />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { KeyIcon } from 'vue-feather-icons'

export default {
  auth: false,
  components: {
    KeyIcon
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      passStr: '',
      passwordDetails: {
        password: '',
        confirmPassword: ''
      },
      errors: {
        password: { invalid: false, mismatch: false }
      }
    }
  },
  mounted () {
    this.passStr = this.$route.query.s
  },
  methods: {
    postPasswordDetails (e) {
      e.preventDefault()
      this.resetErrors()
      this.state = this.states.loading
      this.$axios.patch(`/auth/password/setnew?token=${this.passStr}`, this.passwordDetails)
        .then((res) => {
          this.state = this.states.default
          if (res.data.success) {
            this.$router.push('/account')
            this.$store.commit('toasts/create', { title: 'User', message: 'Password reset' })
          } else {
            this.errors = res.data.error
          }
        })
        .catch((e) => {
          this.state = this.states.default
          const data = e.response.data
          if (data.error) {
            this.errors = data.error
          }
        })
    },
    resetErrors () {
      this.errors = {
        token: { expired: false, invalid: true },
        password: { invalid: false, mismatch: false }
      }
    }
  },
  head () {
    return {
      title: 'Reset password | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Reset password | Bandmatch' }
        // other meta
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
