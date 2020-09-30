<template>
  <div class="flex-container bg-polka">
    <div class="my-5 w-3/4 max-w-2xl mx-auto">
      <div v-if="state === states.default" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block" style="height: 15rem;">
        <ButtonPrimary :action="() => state=states.signup">
          Sign up
        </ButtonPrimary>
        <p class="w-full text-center font-semibold"> OR </p>
        <ButtonPrimary :action="() => state=states.login">
          Log in
        </ButtonPrimary>
      </div>

      <SignupForm :switchView="() => {state=states.login}" v-if="state === states.signup" />
      <LoginForm :switchView="() => {state=states.signup}" v-if="state === states.login" />

    </div>

  </div>
</template>

<script>
import { ButtonPrimary } from '~/components/core/ButtonPrimary'

export default {
  components: {
    ButtonPrimary
  },
  data () {
    return {
      states: {
        default: 0,
        login: 1,
        signup: 2,
        password: 3
      },
      state: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
