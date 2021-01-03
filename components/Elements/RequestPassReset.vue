<template>
  <div class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block">
    <div class="w-full text-center">
      <h1 class="w-full text-4xl md:text-6xl text-center mb-2">
        Request new password
      </h1>
      <p>
        Or <a class="clickable text-primary-300 underline" @click="switchView"><link-icon size="1x" class="inline-block" /> Sign up / Log in</a> instead
      </p>
    </div>

    <form @submit="postRequest">
      <div v-if="state===states.default" class="max-w-350 block mx-auto mb-2">
        <TextInput v-model="resetDetails.email" type="email" placeholder="you@youremail.com" label="Email" autofill="email">
          <mail-icon class="block mx-auto" />
        </TextInput>
        <TextError v-if="errors.email && errors.email.invalid">
          Email is incorrect.
        </TextError>
        <TextError v-if="errors.email && errors.email.absent">
          Email is invalid.
        </TextError>
      </div>

      <ButtonPrimary v-if="state===states.default" :action="()=>{}" class="max-w-350 mx-auto w-full my-3">
        Request new password
      </ButtonPrimary>
      <div v-else-if="state===states.success" class="max-w-350 block mx-auto w-full my-3">
        <p class="w-full text-center">
          Check your emails for a password reset form.
        </p>
      </div>
      <div v-else class="block w-1/2 h-12 md:h-24 mx-auto">
        <LoaderAnim />
      </div>
    </form>
  </div>
</template>

<script>
import { MailIcon, LinkIcon } from 'vue-feather-icons'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import TextError from '~/components/Core/TextError'
import LoaderAnim from '~/components/Core/LoaderAnim'

export default {
  components: {
    MailIcon,
    LinkIcon,
    ButtonPrimary,
    TextError,
    LoaderAnim
  },
  props: {
    switchView: Function
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1,
        success: 2
      },
      state: 0,
      resetDetails: {
        email: ''
      },
      errors: {
        email: { absent: false, invalid: false }
      }
    }
  },
  methods: {
    postRequest (e) {
      e.preventDefault()
      this.resetErrors()
      this.state = this.states.loading
      this.$axios.patch('/users/password/request', this.resetDetails)
        .then((res) => {
          if (res.data.success) {
            this.state = this.states.success
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
      this.$emit('return')
    },
    resetErrors () {
      this.errors = {
        email: { absent: false, invalid: false }
      }
    }
  }
}
</script>

<style lang="scss" scoped >
@import '~/assets/scss/styles.scss';
</style>
