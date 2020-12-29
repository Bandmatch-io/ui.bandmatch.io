<template>
  <div class="flex-container bg-polka">
    <div class="my-5 w-3/4 max-w-2xl mx-auto">
      <div class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block mb-2">
        <div class="w-full text-center">
          <h1 class="w-full text-3xl md:text-6xl text-center mb-2">
            Update password
          </h1>
          <p>
            <a class="clickable text-primary-300 underline" @click="goBack">
              <link-icon size="1x" class="inline-block mr-1" />Cancel
            </a>
          </p>
        </div>

        <div v-if="user" class="max-w-350 mx-auto border rounded shadow bg-white">
          <div class="grid grid-cols-4 w-full border-b">
            <div class="col-span-1 border-r py-2 bg-primary-grad text-white">
              <mail-icon class="block mx-auto" />
            </div>
            <div class="col-span-3 px-3 py-2">
              {{ user.email }}
            </div>
          </div>
          <div class="grid grid-cols-4 w-full">
            <div class="col-span-1 border-r py-2 bg-primary-grad text-white">
              <user-icon class="block mx-auto" />
            </div>
            <div class="col-span-3 px-3 py-2">
              {{ user.displayName }}
            </div>
          </div>
        </div>

        <form @submit="postPasswordDetails">
          <div class="max-w-350 block mx-auto">
            <TextInput v-model="passwordDetails.oldPassword" type="password" placeholder="Your password" label="Current Password" autofill="current-password">
              <key-icon class="block mx-auto" />
            </TextInput>
            <TextError v-if="errors.password && errors.password.incorrect">
              Password is incorrect.
            </TextError>
          </div>
          <div class="max-w-350 block mx-auto">
            <TextInput v-model="passwordDetails.newPassword" type="password" placeholder="Your password" label="New Password" autofill="new-password">
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

          <ButtonPrimary v-if="state===states.default" :action="()=>{}" class="max-w-350 mx-auto w-full my-2">
            Update password
          </ButtonPrimary>
          <div v-else class="block w-1/2 h-12 md:h-24 mx-auto">
            <LoaderAnim />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { KeyIcon, MailIcon, UserIcon, LinkIcon } from 'vue-feather-icons'
import ButtonPrimary from '~/components/Core/ButtonPrimary'

export default {
  auth: false,
  components: {
    KeyIcon,
    MailIcon,
    UserIcon,
    LinkIcon,
    ButtonPrimary
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      passwordDetails: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      errors: {
        password: { incorrect: false, invalid: false, mismatch: false }
      }
    }
  },
  computed: {
    user () {
      return this.$auth.user
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
      this.$axios.patch('/auth/password/', this.passwordDetails)
        .then((res) => {
          this.state = this.states.default
          if (res.data.success) {
            this.$router.push('/profile/edit')
            this.$store.commit('toasts/create', { title: 'User', message: 'Password updated' })
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
    goBack () {
      this.$router.push('/profile/edit')
    },
    resetErrors () {
      this.errors = {
        password: { incorrect: false, invalid: false, mismatch: false }
      }
    }
  },
  head () {
    return {
      title: 'Update password | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Update password | Bandmatch' }
        // other meta
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
