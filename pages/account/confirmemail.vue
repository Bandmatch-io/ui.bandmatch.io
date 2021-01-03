<template>
  <div class="flex-container bg-polka">
    <div class="my-5 w-3/4 max-w-2xl mx-auto">
      <div class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block mb-2">
        <div class="w-full text-center">
          <h1 class="w-full text-3xl md:text-6xl text-center mb-2">
            Confirm Email
          </h1>
          <p>
            <a class="clickable text-primary-300 underline" @click="goBack">
              <link-icon size="1x" class="inline-block mr-1" />Home
            </a>
          </p>
        </div>

        <div v-if="fetchedUser" class="max-w-350 mx-auto">
          <div class="mb-8 border rounded shadow bg-white">
            <div class="grid grid-cols-4 w-full border-b">
              <div class="col-span-1 rounded-tl border-r py-2 bg-primary-grad text-white">
                <mail-icon class="block mx-auto" />
              </div>
              <div class="col-span-3 px-3 py-2">
                {{ fetchedUser.email }}
              </div>
            </div>
            <div class="grid grid-cols-4 w-full">
              <div class="col-span-1 rounded-bl border-r py-2 bg-primary-grad text-white">
                <user-icon class="block mx-auto" />
              </div>
              <div class="col-span-3 px-3 py-2">
                {{ fetchedUser.displayName }}
              </div>
            </div>
          </div>
          <ButtonPrimary class="w-full block" :action="sendConfirmUser">
            <check-circle-icon class="mr-1 inline-block" />Confirm Account
          </ButtonPrimary>
        </div>
        <div v-else class="block w-1/2 h-12 md:h-24 mx-auto">
          <LoaderAnim />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MailIcon, UserIcon, LinkIcon, CheckCircleIcon } from 'vue-feather-icons'
import ButtonPrimary from '~/components/Core/ButtonPrimary'

export default {
  auth: false,
  components: {
    MailIcon,
    UserIcon,
    LinkIcon,
    CheckCircleIcon,
    ButtonPrimary
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 1,
      passwordDetails: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      token: '',
      fetchedUser: undefined,
      loggedInUser: undefined,
      errors: {
        password: { incorrect: false, invalid: false, mismatch: false }
      }
    }
  },
  mounted () {
    this.token = this.$route.query.s
    this.loggedInUser = this.$auth.user

    this.fetchUserDetails()
  },
  methods: {
    fetchUserDetails () {
      this.$axios.get(`/users/profile/confirm_token/${this.token}`)
        .then((res) => {
          this.state = this.states.default
          if (res.data.success) {
            this.fetchedUser = res.data.user

            if (this.loggedInUser._id !== this.fetchedUser._id) {
              this.$router.push('/profile/edit')
              this.$store.commit('toasts/create', { title: 'Account', message: 'Cannot verify email for other account.' })
            }
          }
        })
        .catch((e) => {
          this.state = this.states.default
          this.$router.push('/account')
          this.$store.commit('toasts/create', { title: 'Account', message: 'Invalid token.' })
        })
    },
    sendConfirmUser () {
      this.$axios.get(`/users/confirm/${this.token}`)
        .then((res) => {
          this.state = this.states.default
          if (res.data.success) {
            this.$router.push('/')
            this.$store.commit('toasts/create', { title: 'Account', message: 'Thank you for verifying your email.' })
          }
        })
        .catch((e) => {
          this.state = this.states.default
          this.$router.push('/')
          this.$store.commit('toasts/create', { title: 'Account', message: 'Could not verify your email.' })
        })
    },
    goBack () {
      this.$router.push('/account')
    },
    resetErrors () {
      this.errors = {
        password: { incorrect: false, invalid: false, mismatch: false }
      }
    }
  },
  head () {
    return {
      title: 'Confirm email | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Confirm email | Bandmatch' }
        // other meta
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
